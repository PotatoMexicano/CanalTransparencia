import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CardToken from '@/components/Registrar/CardToken';
import { useRef, useState } from 'react';
import { useDialog } from '@/context/DialogTokenContext';
import { toast } from 'sonner';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useRegisterChamadoMutation } from '@/api/chamadoApi';
import { ShineBorder } from '../ui/shine-border';
import { useTheme } from '@/context/ThemeContext';

const convertFileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      const mimeType = file.type;
      resolve({ base64: base64String, mimeType });
    };
    reader.onerror = (error) => reject(error);
  });
};

const formSchema = z.object({
  subject: z.string()
    .min(5, "Assunto deve possuir mais de 5 caracteres.")
    .max(50, "Assunto deve possuir menos de 50 caracteres."),

  message: z.string()
    .min(5, "Mensagem deve possuir mais de 5 caracteres.")
    .max(300, "Mensagem deve possuir menos de 300 caracteres."),

  file: z.instanceof(File)
    .nullable()
    .refine((file) => !file || file.size <= 10 * 1024 * 1024, "Tamanho máximo para anexo é 10MB.")
    .transform((value) => value ?? null),
})

function Registrar() {

  const theme = useTheme();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);

  const [token, setToken] = useState('');

  const { setIsDialogOpen, setAllowCloseDialog } = useDialog();

  const [registerChamado] = useRegisterChamadoMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      subject: "",
      file: null
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {

    setSubmitting(true);

    try {
      let base64File: string | null = null;
      let mimeType: string | null = null;

      if (values.file) {
        const { base64, mimeType: type } = await convertFileToBase64(values.file);
        base64File = base64;
        mimeType = type;
      }
      const response = await registerChamado({
        assunto: values.subject,
        mensagem: values.message,
        file: base64File,
        mimetype: mimeType,
      });

      if (response.data?.status === 200) {
        setAllowCloseDialog(false);
        setToken(response.data.detail);
        setIsDialogOpen(true);
        setSubmitting(false);

        form.reset();

        if (inputFileRef.current) {
          inputFileRef.current.value = "";
        }

      } else {
        toast.error("Ocorreu um erro na solicitação");
      }
      setSubmitting(false);

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <ShineBorder color={theme.theme === "dark" ? "white" : "black"} className='w-full p-0'>
            <Card className="m-auto border-0">

              <CardHeader className='text-center'>
                <CardTitle>Abrir chamado</CardTitle>
                <CardDescription>Preencha as informações do seu chamado.</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid w-full items-center gap-4">

                  <div className="grid w-full items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name='subject'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assunto</FormLabel>
                          <FormControl>
                            <Input autoComplete='off' placeholder="Assunto" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea placeholder='Sua mensagem' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='flex flex-col space-y-1.5'>
                    <FormField
                      control={form.control}
                      name='file'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Arquivos</FormLabel>
                          <FormControl>
                            <Input type='file' onChange={(e) => field.onChange(e.target.files?.[0] || null)} onBlur={field.onBlur} name={field.name} ref={inputFileRef} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex w-full">
                <Button disabled={submitting} className='w-full bg-primary' type='submit'>{!submitting ? "Enviar" : "Enviando"}</Button>
              </CardFooter>

            </Card>
          </ShineBorder>

        </form>
      </Form>
      <CardToken token={token} />
    </div>
  );
}

export default Registrar
