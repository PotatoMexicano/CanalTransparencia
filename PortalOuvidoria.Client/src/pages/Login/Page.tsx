import { ThemeToggle } from '@/components/utils/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ShineBorder } from "@/components/ui/shine-border"
import { useTheme } from '@/context/ThemeContext'
import { useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { ArrowLeft, Eraser } from 'lucide-react'
import { toast } from 'sonner'
import { useRequestOTPMutation, useValidateOTPMutation } from '@/api/authApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '@/auth/userSlice'

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }).nonempty("Email é obrigatório"),
  code: z.string().min(6, { message: "Insira o código completo" })
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [showOTP, setShowOTP] = useState(false);
  const [requestOTP] = useRequestOTPMutation();
  const [validateOTP] = useValidateOTPMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      code: ""
    },
  });

  const { trigger } = form;

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userInfo = await validateOTP(values).unwrap();
      dispatch(setUser(userInfo));
      toast.success("Bem-Vindo");
      await navigate('/dashboard', { replace: true });
    }
    catch (err) {
      toast.error("Token inválido ou expirado.");
      console.error('Erro ao enviar OTP:', err);
      resetOTP();
    }
  }

  const sendEmail = async () => {
    const validEmail = await trigger('email');
    if (validEmail) {
      try {
        await requestOTP({ email: form.getValues('email') }).unwrap();
        toast.success("Verifique sua caixa de entrada.");
        toggleOTPForm();
      }
      catch (err) {
        toast.error("Erro ao enviar OTP");
        console.error('Erro ao enviar OTP:', err);
      }
    }
  }

  const toggleOTPForm = () => {
    setShowOTP(!showOTP);
    resetOTP()
  }

  const resetOTP = () => {
    form.resetField('code');
  }

  return (
    <>
      <div className="min-h-screen w-full relative flex items-center justify-center bg-grid-black/[0.05] dark:bg-grid-white/[0.2] dark:bg-black">
        <div className="fixed pointer-events-none inset-0 flex items-center justify-center bg-gray-100 dark:bg-black z-0 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>

        <div className='flex h-screen w-screen z-10'>
          <div className="mx-auto my-auto">
            <h1 className="text-6xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto">
              <strong>Canal Transparência</strong>
            </h1>

            <div className="m-5">
              <div className="text-neutral-700 dark:text-white text-2xl text-center font-bold">
                Administradores
              </div>
            </div>

            <div>
              <div className="w-full" style={{ transformStyle: "preserve-3d" }}>
                <ShineBorder color={theme.theme === "dark" ? "white" : "black"} className='w-full p-0'>
                  <Card className='border-0 w-full h-66'>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <CardHeader className='text-center'>
                          <CardTitle>Dashboard de controle de chamados</CardTitle>
                          <CardDescription>Faça login para acessar o painel de administração.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                              {!showOTP &&
                                <FormField
                                  control={form.control}
                                  name='email'
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                        <Input placeholder='Email de acesso' {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              }

                              {showOTP &&
                                <FormField
                                  control={form.control}
                                  name='code'
                                  render={({ field }) => (
                                    <FormItem className='text-center'>
                                      <FormLabel>Código de acesso</FormLabel>
                                      <FormControl>
                                        <div className='flex justify-between'>
                                          <div>
                                            <Button type='button' variant={'outline'} className='h-full border-primary/80' onClick={toggleOTPForm} asChild>
                                              <ArrowLeft size={56} strokeWidth={1.5} strokeOpacity={.8} className='hover:border-white/80' />
                                            </Button>
                                          </div>

                                          <div>
                                            <InputOTP maxLength={6} {...field}>
                                              <InputOTPGroup>
                                                <InputOTPSlot index={0} className='border-primary/80 p-6 text-xl uppercase' />
                                                <InputOTPSlot index={1} className='border-primary/80 p-6 text-xl uppercase' />
                                                <InputOTPSlot index={2} className='border-primary/80 p-6 text-xl uppercase' />
                                                <InputOTPSlot index={3} className='border-primary/80 p-6 text-xl uppercase' />
                                                <InputOTPSlot index={4} className='border-primary/80 p-6 text-xl uppercase' />
                                                <InputOTPSlot index={5} className='border-primary/80 p-6 text-xl uppercase' />
                                              </InputOTPGroup>
                                            </InputOTP>
                                          </div>

                                          <div>
                                            <Button type='button' variant={'outline'} className='h-full border-primary/80' onClick={resetOTP} asChild>
                                              <Eraser size={56} strokeWidth={1.5} strokeOpacity={.8} className='hover:bg-red-500 hover:border-white/80' />
                                            </Button>
                                          </div>
                                        </div>

                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              }
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex w-full">
                          {showOTP &&
                            <Button className='w-full' type='submit'>Entrar</Button>
                          }
                          {!showOTP &&
                            <Button className='w-full' onClick={sendEmail} type='button'>Enviar</Button>
                          }
                        </CardFooter>
                      </form>
                    </Form>
                  </Card>
                </ShineBorder>
              </div>
            </div>

            <div className="fixed flex gap-3 right-14 bottom-14 z-50 max-md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
