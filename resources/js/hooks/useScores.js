import { useState } from "react";
import { router } from "@inertiajs/react";

export const useScores = ({ contestants, existingScores = {}, maxScore, endpoint }) => {
    const [scores, setScores] = useState(existingScores || {});

    const maleContestants = contestants.filter(c => c.gender === "male");
    const femaleContestants = contestants.filter(c => c.gender === "female");

    const isComplete = gender => {
        const list = gender === "male" ? maleContestants : femaleContestants;
        return list.every(c => scores[c.id] !== undefined && scores[c.id] !== "" && !isNaN(parseFloat(scores[c.id])));
    };

    const isSubmitted = gender => {
        const list = gender === "male" ? maleContestants : femaleContestants;
        return list.every(c => existingScores[c.id] !== null && existingScores[c.id] !== undefined);
    };

    const handleScoreChange = (id, value) => {
        if (value === "") {
        setScores(prev => ({ ...prev, [id]: "" }));
        return;
        }

        // Allow only numbers with at most 1 decimal
        const regex = /^\d{0,2}(\.\d?)?$/;
        if (!regex.test(value)) return;

        const num = parseFloat(value);
        if (isNaN(num) || num > maxScore) return;

        setScores(prev => ({ ...prev, [id]: value }));
    };

    const handleScoreBlur = id => {
        const value = scores[id];
        if (value === "") return;

        let num = parseFloat(value);
        if (!isNaN(num)) {
        num = Math.min(maxScore, Math.max(0, num));
        setScores(prev => ({ ...prev, [id]: num.toFixed(1) }));
        }
    };

    const handleSubmit = gender => {
        const filtered = Object.entries(scores).filter(([id]) =>
        gender === "male"
            ? maleContestants.some(c => c.id.toString() === id)
            : femaleContestants.some(c => c.id.toString() === id)
        );

        const data = Object.fromEntries(filtered);

        router.post(endpoint, { gender, scores: data }, {
        onSuccess: () => alert("Scores submitted successfully!"),
        onError: () => alert("Failed to submit scores."),
        });
    };

    return {
        scores,
        handleScoreChange,
        handleScoreBlur,
        handleSubmit,
        isComplete,
        isSubmitted,
        maleContestants,
        femaleContestants,
    };
};
