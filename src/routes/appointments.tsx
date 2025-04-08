import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/appointments")({
  component: RouteComponent,
});

function RouteComponent() {
  const appointments = useQuery(api.appointment.getAppointments);
  const deleteAppointment = useMutation(api.appointment.deleteAppointment);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border-border border-1 rounded-md p-20">
        {(!appointments || appointments.length === 0) && (
          <p className="text-primary/50">No Current Appointments</p>
        )}
        {appointments && appointments.length !== 0 && (
          <Table>
            <TableCaption>A list of Appointments.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Action</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments?.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell className="w-[100px]">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={async () => {
                        await deleteAppointment({ id: appointment._id });
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.email}</TableCell>

                  <TableCell className="text-right w-[300px]">
                    {new Date(appointment._creationTime).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
