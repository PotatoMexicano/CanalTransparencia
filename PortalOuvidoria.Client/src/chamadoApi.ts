import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export interface AcompanharChamado {
  token_acompanhamento: string;
}

export interface ErrorResponse{
  title: string,
  detail: string
}

export const chamadoApi = createApi({
  reducerPath: 'chamadoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.245.75:5299/api/chamado' }),
  endpoints: (builder) => ({
    fetchChamado: builder.query<AcompanharChamadoResponse, AcompanharChamado>({
      query: (data) => {
        return {
          url: 'acompanhar',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      },
      transformResponse: (response: AcompanharChamadoResponse) => ({
        ...response,
      }),
    }),
    registerChamado: builder.mutation<RegistrarChamadoResponse, RegistrarChamado>({
      query: (data) => {
        const formData = new FormData();
        formData.append('assunto', data.assunto);
        formData.append('mensagem', data.mensagem);

        if (data.file) {
          formData.append('file', data.file);
          formData.append('mimetype', data.mimetype ?? "");
        }

        return {
          url: 'registrar',
          method: 'POST',
          body: formData
        }
      }
    })
  })
})

export const { useRegisterChamadoMutation, useLazyFetchChamadoQuery } = chamadoApi;