import React from "react";
import { PageLayout } from "@/Layouts/PageLayout";
import { Star } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Result = ({ auth, results = {} }) => {
    const user = auth?.user;
    const breadcrumbs = [{ label: "Result", href: "#" }];

    const maleResults = results.male || [];
    const femaleResults = results.female || [];

    const renderTable = (list) => (
        <Table className="mb-8">
        <TableHeader>
            <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead>SU</TableHead>
            <TableHead>Sports</TableHead>
            <TableHead>SPTVE</TableHead>
            <TableHead>Fil/Barong</TableHead>
            <TableHead>Q&A</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ranking</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {list.map((c) => (
            <TableRow key={c.contestant_id}>
                <TableCell>{c.contestant_number}</TableCell>
                <TableCell className="flex items-center gap-1">
                    {c.name}
                    {c.top_funder && <Star className="w-4 h-4 text-blue-500" />}
                </TableCell>
                <TableCell>{c.school_uniform ?? "-"}</TableCell>
                <TableCell>{c.sports ?? "-"}</TableCell>
                <TableCell>{c.sptve ?? "-"}</TableCell>
                <TableCell>{c.filipiniana_barong ?? "-"}</TableCell>
                <TableCell>{c.q_and_a ?? "-"}</TableCell>
                <TableCell>{c.stage_presence ?? "-"}</TableCell>
                <TableCell className="font-semibold">{c.total_scores ?? "-"}</TableCell>
                <TableCell className="font-semibold">{c.placement}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
  );

  return (
    <PageLayout user={user} breadcrumbs={breadcrumbs}>
        <h2 className="text-2xl font-bold mb-4 text-center">Male Contestants</h2>
        {renderTable(maleResults)}

        <h2 className="text-2xl font-bold mb-4 text-center">Female Contestants</h2>
        {renderTable(femaleResults)}
    </PageLayout>
  );
};

export default Result;
