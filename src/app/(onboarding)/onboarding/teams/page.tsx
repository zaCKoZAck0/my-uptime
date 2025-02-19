"use client";
import { ChevronRight } from "lucide-react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "~/hooks/use-toast";
import { useRouter } from "next/navigation";
import api from "~/lib/api-client";
import { Team } from "@prisma/client";
import { ToastError } from "~/components/api-error-toast";

const createTeamSchema = z.object({
  name: z.string().min(3, "Too Short, minimum length 3").max(50, "Too Long, maximum length 50"),
});

export default function AllTeamsPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "My Team",
    },
  });

  async function onSubmit(values: z.infer<typeof createTeamSchema>) {

    const [response, error] = await api.post<Team>("/teams", values);

    if(response)    
      return router.push(`/team/${response.data.id}/monitors`);
      
    if (error)
      toast(ToastError("Error Creating Team", error))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center min-h-screen"
      >
        <Card className="min-w-[380px]">
          <CardHeader>
            <CardTitle>Create a team</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your team's name." {...field} />
                  </FormControl>
                  <FormDescription>
                    You can invite members to your team later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              size="sm"
              variant="neutral"
            >
              Continue
              <ChevronRight size={3} />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
