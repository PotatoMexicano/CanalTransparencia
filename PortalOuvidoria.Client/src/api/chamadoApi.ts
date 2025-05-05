import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./base-api";

export interface RegistrarChamado {
  assunto: string;
  mensagem: string;
  file?: string | null;
  mimetype?: string | null;
}

export interface RegistrarChamadoResponse {
  title: string;
  status: number;
  detail: string;
}

export interface AcompanharChamadoResponse {
  token_acompanhamento: string;
  utc_data_registro: string;
  id_situacao: number;
  situacao: string;
  utc_data_analise: string;
  utc_data_evidencia: string;
  utc_data_comentario: string;
  utc_data_finalizado: string;
  comentario_finalizado: string;
}

export interface ChamadoCompletoResponse {
  id: string;
  token_acompanhamento: string;
  mensagem: string;
  assunto: string;
  utc_data_registro: string;
  utc_data_registro_10_dias: string;
  utc_data_registro_25_dias: string;
  id_situacao: number,
  situacao: string;
  comentario_finalizado: string;
  possui_evidencia: true,
  nome_evidencia: string;
}

export interface AcompanharChamado {
  token_acompanhamento: string;
}

export interface ErrorResponse {
  title: string,
  detail: string
}

export const chamadoApi = createApi({
  reducerPath: 'chamadoApi',
  baseQuery: customBaseQuery(),
  tagTypes: ["Chamados"],
  endpoints: (builder) => ({
    fetchChamado: builder.query<AcompanharChamadoResponse, AcompanharChamado>({
      query: (data: AcompanharChamado) => {
        return {
          url: 'chamado/acompanhar',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      },
      transformResponse: (response: AcompanharChamadoResponse): AcompanharChamadoResponse => ({
        ...response,
      }),
    }),
    registerChamado: builder.mutation<RegistrarChamadoResponse, RegistrarChamado>({
      query: (data: RegistrarChamado) => {
        const formData: FormData = new FormData();
        formData.append('assunto', data.assunto);
        formData.append('mensagem', data.mensagem);
        
        if (data.file) {
          formData.append('file', data.file);
          formData.append('mimetype', data.mimetype ?? "");
        }

        return {
          url: 'chamado/registrar',
          method: 'POST',
          body: formData
        }
      },
      invalidatesTags: ["Chamados"],
    }),
    pendingChamados: builder.query<ChamadoCompletoResponse[], void>({
      query: () => 'chamado/pendentes',
      providesTags: ["Chamados"],
    }),
    openChamados: builder.query<ChamadoCompletoResponse[], void>({
      query: () => 'chamado/abertos',
      providesTags: ["Chamados"],
    }),
    finishedChamados: builder.query<ChamadoCompletoResponse[], void>({
      query: () => 'chamado/encerrados',
      providesTags: ["Chamados"],
    }),
    countChamados: builder.query<{
      contagem_por_situacao: {
        registrado: number;
        finalizado: number;
        analisando: number;
        atribuido_comentarios: number;
        verificando_evidencias: number;
      },
      contagem_tres_meses: number,
    }, void>({
      query: () => 'chamado/info/contagem',
      providesTags: ["Chamados"],      
    })
  })
})

export const {
  useRegisterChamadoMutation,
  useLazyFetchChamadoQuery,
  useCountChamadosQuery,
  usePendingChamadosQuery,
  useOpenChamadosQuery,
  useFinishedChamadosQuery,
} = chamadoApi;