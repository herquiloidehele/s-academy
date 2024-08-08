import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Users } from "lucide-react";
import { ICourseSummary } from "@/app/tutor/summary/summaryStore";

export function SubscriptionsResumeTable({ coursesStatsData }: { coursesStatsData: ICourseSummary[] }) {
  return (
    <Table className="bg-transparent">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Alunos</TableHead>
          <TableHead>
            Preço <span className="text-xs text-gray-400">(MZN)</span>
          </TableHead>
          <TableHead className="text-right">
            Receita total <span className="text-xs text-gray-400">(MZN)</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coursesStatsData.map((data, index) => (
          <TableRow key={data.id} className="hover:bg-gray-50">
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{data.name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                {data.students}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                {data.price}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                {data.totalRevenue}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-lg" colSpan={4}>
            Total
          </TableCell>
          <TableCell className="text-right font-bold text-lg">
            <span>{coursesStatsData.reduce((acc, curr) => acc + curr.totalRevenue, 0)}</span>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
