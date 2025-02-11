import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import CardHistorico from './CardHistorico';
import { useDialog } from '@/context/DialogTokenContext';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { AcompanharChamadoResponse, ErrorResponse, useLazyFetchChamadoQuery } from '@/chamadoApi';

const formSchema = z.object({
  token: z.string()
    .nonempty()
    .length(10, "O código deve conter 10 caracteres.")
});

export default function Acompanhar() {

  const [data, setData] = useState<AcompanharChamadoResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { setIsDialogOpen } = useDialog();

  const [trigger] = useLazyFetchChamadoQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: ""
    }
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      setSubmitting(true);

      const { data, error, isSuccess } = await trigger({ token_acompanhamento: values.token });

      if (isSuccess) {
        setData(data);
        setIsDialogOpen(true);
      } else {
        setData(null);
        setIsDialogOpen(false);

        if (error && 'data' in error) {
          console.error(error)
          const apiError = error.data as ErrorResponse;        
          toast.info(apiError.title ?? "Chamado não encontrado");
        } else {
          toast.info("Chamado não encontrado");
        }
      }

    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error('Ocorreu um erro', {
          description: error.message
        });
      }
    }

    setSubmitting(false);
  }

  return (
    <div>
      <Card className="m-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardHeader className='text-center'>
              <CardTitle>Acompanhar chamado</CardTitle>
              <CardDescription>Informe o código de acompanhamento.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid w-full items-center gap-4">

                <div className="grid w-full items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name='token'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código</FormLabel>
                        <FormControl>
                          <Input autoComplete='off' maxLength={10} placeholder="Código de acompanhamento" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

              </div>
            </CardContent>
            <CardFooter className="flex w-full">
              <Button className='w-full' type='submit' disabled={submitting}>{!submitting ? "Acompanhar" : "Procurando"}</Button>
            </CardFooter>
          </form>
        </Form>
        {data && (
          <CardHistorico data={data} />
        )}

      </Card>
    </div>
  )
}