import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import CardToken from '@/components/Registrar/CardToken';
import { useRef, useState } from 'react';
import { useDialog } from '@/context/DialogTokenContext';
import { toast } from 'sonner';

function Registrar() {

  const resetFields = () => {
    setSubject('');
    setMessage('');
    setFile(null);

    if (fileInputRef.current)
      fileInputRef.current.value = '';
  }

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);

  const [token, setToken] = useState('');

  const { setIsDialogOpen, setAllowCloseDialog } = useDialog();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('subject', subject);
    formDataToSend.append('message', message);
    if (file) formDataToSend.append('file', file);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAllowCloseDialog(false);
      setToken("ABC123");
      setIsDialogOpen(true);


      setSubmitting(false);
      resetFields();

    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        toast.error('Ocorreu um erro', {
          description: error.message
        });
      }
      setSubmitting(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card className="m-auto">

          <CardHeader className='text-center'>
            <CardTitle>Abrir chamado</CardTitle>
            <CardDescription>Preencha as informações do seu chamado.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid w-full items-center gap-4">

              <div className="grid w-full items-center gap-1.5">
                <Label className='flex' htmlFor="subject">Assunto</Label>
                <Input id="subject" placeholder="Assunto" maxLength={50} value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label className='flex' htmlFor="message">Mensagem</Label>
                <Textarea placeholder='Sua mensagem' id='message' maxLength={300} value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>

              <div className='flex flex-col space-y-1.5'>
                <Label className='flex' htmlFor='file'>Arquivos</Label>
                <Input id='file' type='file' ref={fileInputRef} onChange={handleFileChange} />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex w-full">
            <Button disabled={submitting} className='w-full bg-primary' type='submit'>{!submitting ? "Enviar" : "Enviando"}</Button>
          </CardFooter>
          
        </Card>
      </form>
      <CardToken token={token} />
    </div>
  );
}

export default Registrar
