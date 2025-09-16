import React from "react";
import { PageLayout } from "@/Layouts/PageLayout";
import { router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

const categories = [
    { key: "school_uniform", label: "School Uniform" },
    { key: "sports", label: "Sports" },
    { key: "sptve", label: "SPTVE" },
    { key: "filipiniana_barong", label: "Filipiniana/Barong" },
    { key: "q_and_a", label: "Q & A" },
    { key: "stage_presence", label: "Stage Presence" },
];

const ResultByJudges = ({ auth, results = [], category }) => {
    const user = auth?.user;
    const breadcrumbs = [{ label: "Result Per Judges", href: "#" }];

  const handleCategoryChange = (newCategory) => {
    router.get(
      route("result_by_judges"),
      { category: newCategory },
      { preserveState: true }
    );
  };

    const judgeLabels = ["Judge 1", "Judge 2", "Judge 3", "Judge 4", "Judge 5"];

    const maleResults = results.filter((c) => c.gender === "male");
    const femaleResults = results.filter((c) => c.gender === "female");

    const renderTable = (title, data) => (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <Table>
                <TableHeader>
                    <TableRow className="bg-blue-900 hover:bg-blue-800">
                        <TableHead className="text-white">#</TableHead>
                        <TableHead className="text-white">Name</TableHead>
                        {judgeLabels.map((label, idx) => (
                            <TableHead key={idx} className="text-white">
                                {label}
                            </TableHead>
                        ))}
                        <TableHead className="text-white">Total</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((c, i) => (
                        <TableRow key={c.contestant_id}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell className="flex items-center gap-2">
                                <img
                                    src={c.image}
                                    alt={c.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span>{c.name}</span>
                            </TableCell>

                            {judgeLabels.map((label, idx) => (
                                <TableCell key={idx}>
                                    {c.scores[label] ?? "-"}
                                </TableCell>
                            ))}

                            <TableCell className="font-semibold">
                                {c.total}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

    const currentCategoryLabel =
        categories.find((cat) => cat.key === category)?.label || "Select Category";

    return (
        <PageLayout user={user} breadcrumbs={breadcrumbs}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Result Per Judges - {currentCategoryLabel}</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="yellow">{currentCategoryLabel}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Categories</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {categories.map((cat) => (
                            <DropdownMenuItem
                                key={cat.key}
                                onClick={() => handleCategoryChange(cat.key)}
                            >
                                {cat.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {renderTable("Male Contestants", maleResults)}
            {renderTable("Female Contestants", femaleResults)}
        </PageLayout>
    );
};

export default ResultByJudges;
