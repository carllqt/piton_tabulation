import React from "react"
import { PageLayout } from "@/Layouts/PageLayout"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useScores } from "@/hooks/useScores"
import { ScoreTab } from "@/Layouts/ScoreTab"

const StagePresence = ({ auth, contestants, existingScores }) => {
    const user = auth?.user
    const breadcrumbs = [{ label: "Stage Presence", href: "#" }]
    const maxScore = 20
    const endpoint = "/stage_presence_scores"

    const {
        scores,
        handleScoreChange,
        handleScoreBlur,
        handleSubmit,
        isComplete,
        isSubmitted,
        maleContestants,
        femaleContestants,
    } = useScores({ contestants, existingScores, maxScore, endpoint })

    return (
        <PageLayout user={user} breadcrumbs={breadcrumbs}>
        <div className="flex justify-center items-start">
            <div className="w-1/2">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-center">Stage Presence 20%</h2>
            </div>

            <Tabs defaultValue="male" className="w-full">
                <div className="border rounded-xl bg-blue-400 p-6">
                <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-6">
                    <TabsTrigger
                    value="male"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
                    >
                    Male
                    </TabsTrigger>
                    <TabsTrigger
                    value="female"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
                    >
                    Female
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="male">
                    <ScoreTab
                    contestants={maleContestants}
                    scores={scores}
                    handleScoreChange={handleScoreChange}
                    handleScoreBlur={handleScoreBlur}
                    handleSubmit={handleSubmit}
                    isComplete={isComplete}
                    isSubmitted={isSubmitted}
                    gender="male"
                    />
                </TabsContent>

                <TabsContent value="female">
                    <ScoreTab
                    contestants={femaleContestants}
                    scores={scores}
                    handleScoreChange={handleScoreChange}
                    handleScoreBlur={handleScoreBlur}
                    handleSubmit={handleSubmit}
                    isComplete={isComplete}
                    isSubmitted={isSubmitted}
                    gender="female"
                    />
                </TabsContent>
                </div>
            </Tabs>
            </div>
        </div>
        </PageLayout>
    )
}

export default StagePresence
