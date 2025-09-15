import React, { useRef } from "react";
import { PageLayout } from "@/Layouts/PageLayout";
import { Star } from "lucide-react";
import html2pdf from "html2pdf.js";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";

const Result = ({ auth, results = {} }) => {
    const user = auth?.user;
    const breadcrumbs = [{ label: "Result", href: "#" }];
    const maleResults = results.male || [];
    const femaleResults = results.female || [];

    const resultRef = useRef();

    const renderTable = (list) => (
        <Table className="mb-8">
            <TableHeader>
                <TableRow className="bg-blue-900 hover:bg-blue-800">
                    <TableHead className="text-white">#</TableHead>
                    <TableHead className="text-left text-white">Name</TableHead>
                    <TableHead className="text-white">School Uniform</TableHead>
                    <TableHead className="text-white">Sports</TableHead>
                    <TableHead className="text-white">SPTVE</TableHead>
                    <TableHead className="text-white">Fil/Barong</TableHead>
                    <TableHead className="text-white">Q&A</TableHead>
                    <TableHead className="text-white">Stage Presence</TableHead>
                    <TableHead className="text-white">Total</TableHead>
                    <TableHead className="text-white">Ranking</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {list.map((c) => (
                    <TableRow key={c.contestant_id} className={c.placement <= 5 ? "bg-yellow-100" : ""}>
                        <TableCell>{c.contestant_number}</TableCell>
                        <TableCell className="flex items-center gap-2">
                            <img
                                src={c.image}
                                alt={c.name}
                                className="w-8 h-8 rounded-full object-cover"
                            />

                            <span>{c.name}</span>

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

    const handlePrintPDF = () => {
        if (!resultRef.current) return;

        const element = resultRef.current;
        const options = {
            margin: 0.5,
            filename: "contest_results.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        html2pdf().set(options).from(element).save();
    };

    return (
        <PageLayout user={user} breadcrumbs={breadcrumbs}>
            <div className="flex justify-end mb-4">
                <button
                    onClick={handlePrintPDF}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Print Result
                </button>
            </div>

            <div ref={resultRef}>
                <h2 className="text-2xl font-bold mb-4 text-center">Male Contestants</h2>
                {renderTable(maleResults)}

                <h2 className="text-2xl font-bold mb-4 text-center">Female Contestants</h2>
                {renderTable(femaleResults)}
            </div>
        </PageLayout>
    );
};

export default Result;
