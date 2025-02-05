import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import CardToken from './CardToken';

function Registrar() {

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [token, setToken] = useState('');
  const [isModalOpen, SetIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('subject', subject);
    formDataToSend.append('message', message);
    if (file) formDataToSend.append('file', file);

    try {
      setToken("ABC123");
      SetIsModalOpen(true);

    } catch (error) {
      console.error('Error:', error);
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
                <Input id='file' type='file' onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex w-full">
            <Button className='w-full bg-primary' type='submit'>Enviar</Button>
          </CardFooter>
        </Card>
      </form>

      <CardToken token={token} isModalOpen={isModalOpen} setIsModalOpen={SetIsModalOpen} />

    </div>
  );
}

export default Registrar
