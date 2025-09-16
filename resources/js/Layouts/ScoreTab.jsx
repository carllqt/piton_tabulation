import React from "react";
import FloatingInput from "@/Components/floating-input";
import { Button } from "@/components/ui/button";

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export const ScoreTab = ({
    contestants,
    scores,
    handleScoreChange,
    handleScoreBlur,
    handleSubmit,
    isComplete,
    isSubmitted,
    gender,
}) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contestants.map((c, index) => (
                    <div
                        key={c.id}
                        className="flex items-center justify-between gap-4 rounded-xl border bg-white shadow p-4"
                    >
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-semibold">
                                {index + 1}
                            </h2>
                            <img
                                src={`/${c.profile_image}`}
                                alt={`${c.first_name} ${c.last_name}`}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {c.first_name} {c.last_name}
                                </h3>
                                <p className="text-sm text-gray-500 capitalize">
                                    {c.gender}
                                </p>
                            </div>
                        </div>

                        <div className="w-24">
                            <FloatingInput
                                label="Score"
                                name={`score-${c.id}`}
                                value={scores[c.id] ?? ""}
                                onChange={(e) =>
                                    handleScoreChange(c.id, e.target.value)
                                }
                                onBlur={() => handleScoreBlur(c.id)}
                                type="text"
                                disabled={isSubmitted(c.gender)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-center">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            disabled={
                                !isComplete(gender) || isSubmitted(gender)
                            }
                        >
                            {isSubmitted(gender)
                                ? "Already Submitted Scores"
                                : `Submit ${gender} Scores`}
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="max-h-[100vh] overflow-y-auto">
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Confirm Submission
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Please review the scores for{" "}
                                <span className="font-semibold">{gender}</span>{" "}
                                contestants before confirming.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        {/* Receipt Section */}
                        <div className="mt-4 border-t pt-4 space-y-2">
                            {contestants.map((c, index) => (
                                <div
                                    key={c.id}
                                    className="flex justify-between items-center text-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={`/${c.profile_image}`}
                                            alt={`${c.first_name} ${c.last_name}`}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <span>
                                            {index + 1}. {c.first_name}{" "}
                                            {c.last_name}
                                        </span>
                                    </div>
                                    <span className="font-semibold">
                                        {scores[c.id] ?? "—"}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <AlertDialogFooter className="mt-6">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => handleSubmit(gender)}
                            >
                                Yes, Submit
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};
