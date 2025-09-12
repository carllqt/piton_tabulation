import React from "react"
import FloatingInput from "@/Components/floating-input"
import { Button } from "@/components/ui/button"

export const ScoreTab = ({ contestants, scores, handleScoreChange, handleScoreBlur, handleSubmit, isComplete, isSubmitted, gender }) => {

    return (
        <div>
        <div className="space-y-4">
            {contestants.map((c, index) => (
            <div key={c.id} className="flex items-center justify-between gap-4 rounded-xl border bg-white shadow p-4">
                <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">{index + 1}</h2>
                <img
                    src={`/${c.profile_image}`}
                    alt={`${c.first_name} ${c.last_name}`}
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-lg font-semibold">{c.first_name} {c.last_name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{c.gender}</p>
                </div>
                </div>

                <div className="w-24">
                <FloatingInput
                    label="Score"
                    name={`score-${c.id}`}
                    value={scores[c.id] ?? ""}
                    onChange={(e) => handleScoreChange(c.id, e.target.value)}
                    onBlur={() => handleScoreBlur(c.id)}
                    type="text"
                    disabled={isSubmitted(c.gender)}
                />
                </div>
            </div>
            ))}
        </div>

        <div className="mt-6 flex justify-center">
            <Button
            onClick={() => handleSubmit(gender)}
            disabled={!isComplete(gender) || isSubmitted(gender)}
            >
            {isSubmitted(gender) ? "Already Submitted Scores" : `Submit ${gender} Scores`}
            </Button>
        </div>
        </div>
    )
}
