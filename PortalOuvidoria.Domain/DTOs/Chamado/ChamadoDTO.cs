using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortalOuvidoria.Domain.DTOs.Chamado;
public class ChamadoDTO
{
    public String? TokenAcompanhamento { get; set; }

    public String? Mensagem { get; set; }
    public String? Assunto { get; set; }

    public DateTime UTC_DataRegistro { get; set; }
    public DateTime? UTC_DataRegistro_10Dias { get; set; }
    public DateTime? UTC_DataRegistro_25Dias { get; set; }

    public Int32 IdSituacao { get; set; }

    public DateTime? UTC_DataAnalise { get; set; }
    public DateTime? UTC_DataEvidencia { get; set; }
    public DateTime? UTC_DataComentario { get; set; }

    public DateTime? UTC_DataFinalizado { get; set; }
    public String? ComentarioFinalizado { get; set; }
}