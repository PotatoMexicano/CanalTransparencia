import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FileIcon, CalendarIcon, Download, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/utils/utils";
import { useParams } from "react-router-dom";

// Mock data - replace with your actual data
const ticketData = {
  subject: "Problema com impressora do setor financeiro",
  description: "A impressora do setor financeiro está apresentando erro de conexão com a rede. Já foi verificado o cabo de rede e está funcionando normalmente. Necessário suporte técnico para verificar as configurações do equipamento.",
  date: "2024-03-20T10:30:00",
  attachment: {
    name: "erro_impressora.pdf",
    size: "2.5 MB",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" // Example PDF for preview
  }
};

function VisualizarChamadoPage() {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState("");
  const [fileViewed, setFileViewed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const canComplete = comment.trim().length > 0 && fileViewed;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Detalhes do Chamado</CardTitle>
              <div className="flex items-center gap-4">
                {isCompleted && (
                  <span className="flex items-center text-green-600 text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Concluído
                  </span>
                )}
                <span className="text-sm text-muted-foreground">
                  #{id?.slice(-8).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              {formatDate(ticketData.date)}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Assunto</h3>
                <p className="text-lg">{ticketData.subject}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Descrição</h3>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <p className="text-sm leading-relaxed">
                    {ticketData.description}
                  </p>
                </ScrollArea>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Anexo</h3>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <FileIcon className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">{ticketData.attachment.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {ticketData.attachment.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog onOpenChange={(open) => open && setFileViewed(true)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Visualizar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl h-[80vh]">
                        <iframe
                          src={ticketData.attachment.url}
                          className="w-full h-full rounded-md"
                          title="Visualização do arquivo"
                        />
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm" asChild>
                      <a href={ticketData.attachment.url} download target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Comentário</h3>
                <Textarea
                  placeholder="Adicione um comentário sobre o chamado..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                  disabled={isCompleted}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  onClick={handleComplete}
                  disabled={!canComplete || isCompleted}
                  className="w-full sm:w-auto"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Marcar como Concluído
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default VisualizarChamadoPage;