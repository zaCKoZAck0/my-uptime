"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {Button} from '~/components/ui/button'
import { FaGithub } from "react-icons/fa"
import { handleLogin } from './handle-login';

export default function LoginPage() {

    return (
        <div className="flex flex-col items-center">
            <Card>
                <CardHeader>
                    <CardTitle>Login to My Uptime</CardTitle>
                    <CardDescription>Please use your Github account to continue.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button size='lg' className='w-full' variant='neutral' onClick={handleLogin}>
                        <FaGithub size={8} />
                        Login with Github
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}