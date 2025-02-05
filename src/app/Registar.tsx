import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function Registrar() {

  return (
    <div>
      <Card className="m-auto w-[500px]">

        <CardHeader>
          <CardTitle>Abrir chamado</CardTitle>
          <CardDescription>Preencha as informações do seu chamado.</CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">

              <div className="grid w-full items-center gap-1.5">
                <Label className='flex' htmlFor="subject">Assunto</Label>
                <Input id="subject" placeholder="Assunto" maxLength={50} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label className='flex' htmlFor="message">Mensagem</Label>
                <Textarea placeholder='Sua mensagem' id='message' maxLength={300} />
              </div>

              <div className='flex flex-col space-y-1.5'>
                <Label className='flex' htmlFor='file'>Arquivos</Label>
                <Input id='file' type='file' />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex w-full">
            <Button className='w-full bg-primary'>Enviar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Registrar
