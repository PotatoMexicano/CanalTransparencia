import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import CardHistorico from './CardHistorico';
import { useDialog } from '@/context/DialogTokenContext';

export default function Acompanhar() {

  const [submitting, setSubmitting] = useState(false);
  const { setIsDialogOpen } = useDialog();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSubmitting(false);

      setIsDialogOpen(true);

    } catch (error) {
      console.error(error);
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
      <Card className="m-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader className='text-center'>
            <CardTitle>Acompanhar chamado</CardTitle>
            <CardDescription>Informe o código de acompanhamento.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid w-full items-center gap-4">

              <div className="grid w-full items-center gap-1.5">
                <Label className='flex' htmlFor="token">Código</Label>
                <Input id="token" placeholder="Código de acompanhamento" maxLength={50} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex w-full">
            <Button className='w-full' type='submit' disabled={submitting}>{!submitting ? "Acompanhar" : "Procurando"}</Button>
          </CardFooter>
        </form>

        <CardHistorico />

      </Card>
    </div>
  )
}