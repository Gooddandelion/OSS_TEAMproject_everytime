import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const { question } = req.body || {};
  if (!question) return res.status(400).json({ error: "question is required" });

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const MOCK_API = "https://68ddd354d7b591b4b78d973a.mockapi.io/oss-team";
    const r = await fetch(MOCK_API);
    const data = await r.json();

    const context = data
      .map(
        (c, i) =>
          `${i + 1}. 강의명: ${c["강의명"]}, 교수님: ${c["교수님"]}, 평점: ${c["평점"]}, 과제량: ${c["과제량"]}, 강의시간: ${c["강의시간"]}`
      )
      .join("\n");

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content:
            "너는 수업 비교 전문가야. 제공된 데이터만 근거해서 두 수업을 비교해줘. 평가, 과제량, 시간표 등의 차이를 명확히 말해.",
        },
        { role: "user", content: `강의 데이터:\n${context}\n\n비교 질문: ${question}` },
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    res.status(200).json({ answer: completion.choices?.[0]?.message?.content ?? "응답이 없습니다." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
