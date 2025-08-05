export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { players, provider = "openrouter" } = body;

  const config = useRuntimeConfig();

  try {
    let aiResponse = "";

    if (provider === "openrouter") {
      const apiKey = config.openrouterApiKey;
      if (!apiKey) {
        throw new Error("OpenRouter API key not configured");
      }

      const totalStrength = players.reduce(
        (sum: number, p: any) => sum + p.strength,
        0
      );
      const targetTeamAverage = totalStrength / 2;

      const prompt = `You are a professional football team builder. Create 2 PERFECTLY BALANCED teams from these ${
        players.length
      } players.

PLAYERS DATA:
${players.map((p: any) => `- ${p.name}: Strength ${p.strength}/10`).join("\n")}

CRITICAL BALANCING RULES:
1. Total players: ${players.length} (each team gets ${
        players.length / 2
      } players)
2. Total strength: ${totalStrength} points
3. Target per team: ${targetTeamAverage.toFixed(1)} points each
4. Team average difference MUST BE ≤ 0.5 points
5. NO team should have all weak players (≤4) or all strong players (≥7)
6. Distribute strength levels evenly across teams
7. Each team should have mix of: weak (1-4), medium (5-6), strong (7-10) players

MATHEMATICAL REQUIREMENTS:
- Team 1 total strength: ${targetTeamAverage.toFixed(1)} ± 1.5 points
- Team 2 total strength: ${targetTeamAverage.toFixed(1)} ± 1.5 points
- |Team1_Average - Team2_Average| ≤ 0.5

Return ONLY this JSON format:
{
  "team1": {
    "name": "Team Alpha",
    "players": ["exact player names here"],
    "total_strength": calculated_total,
    "average_strength": calculated_average
  },
  "team2": {
    "name": "Team Beta", 
    "players": ["exact player names here"],
    "total_strength": calculated_total,
    "average_strength": calculated_average
  }
}

Use EXACT player names. Calculate totals and averages correctly.`;

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "mistralai/mistral-7b-instruct:free",
            messages: [
              {
                role: "system",
                content:
                  "You are a football team builder. Return only valid JSON.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      aiResponse = data.choices?.[0]?.message?.content || "";
    }

    return { success: true, response: aiResponse };
  } catch (error) {
    console.error("AI API Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
});
