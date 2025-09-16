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

import { Button } from "@/Components/ui/button";

const Result = ({ auth, results = {} }) => {
    const user = auth?.user;
    const breadcrumbs = [{ label: "Result", href: "#" }];
    const maleResults = results.male || [];
    const femaleResults = results.female || [];

    const maleRef = useRef();
    const femaleRef = useRef();

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

    const handlePrintPDF = (ref, filename) => {
        if (!ref.current) return;

        const element = ref.current;
        const options = {
            margin: 0.5,
            filename,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        html2pdf().set(options).from(element).save();
    };

    return (
        <PageLayout user={user} breadcrumbs={breadcrumbs}>
            <div className="flex gap-4 justify-end mb-4">
                <Button variant="green"
                    onClick={() => handlePrintPDF(maleRef, "male_results.pdf")}
                >
                    Print Male Results
                </Button>
                <Button variant="pink"
                    onClick={() => handlePrintPDF(femaleRef, "female_results.pdf")}
                >
                    Print Female Results
                </Button>
            </div>

            <div ref={maleRef} className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-center">Male Contestants</h2>
                {renderTable(maleResults)}
            </div>

            <div ref={femaleRef}>
                <h2 className="text-2xl font-bold mb-4 text-center">Female Contestants</h2>
                {renderTable(femaleResults)}
            </div>
        </PageLayout>
    );
};

export default Result;
