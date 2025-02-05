import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Acompanhar() {
  return (
    <div>
      <Card className="m-auto">
        
        <CardHeader className='text-center'>
          <CardTitle>Acompanhar chamado</CardTitle>
          <CardDescription>Informe o código de acompanhamento.</CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              
              <div className="grid w-full items-center gap-1.5">
                <Label className='flex' htmlFor="token">Código</Label>
                <Input id="token" placeholder="Código de acompanhamento" maxLength={50} />
              </div>

            </div>
          </form>
        </CardContent>
        <CardFooter className="flex w-full">
          <Button className='w-full'>Acompanhar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}