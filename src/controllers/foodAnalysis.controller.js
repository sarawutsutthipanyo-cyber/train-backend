const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyzeFood = async (req, res) => {
  try {
    const { imageBase64, mediaType } = req.body;

    if (!imageBase64) return res.status(400).json({ message: 'ต้องส่ง imageBase64' });

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: mediaType || 'image/jpeg',
          data: imageBase64,
        },
      },
      `วิเคราะห์อาหารในรูปภาพนี้และประเมินคุณค่าทางโภชนาการ ตอบเป็น JSON เท่านั้น ในรูปแบบนี้:
{
  "foodName": "ชื่ออาหาร (ภาษาไทย)",
  "foodNameEn": "Food name in English",
  "servingSize": "ปริมาณที่เห็นในรูป เช่น 1 จาน / 1 ชาม",
  "estimatedWeight": 300,
  "calories": 450,
  "protein": 25,
  "carbs": 45,
  "fat": 15,
  "fiber": 3,
  "confidence": "high/medium/low",
  "note": "หมายเหตุเพิ่มเติม"
}
ตอบเฉพาะ JSON เท่านั้น ไม่ต้องมีข้อความอื่น ไม่ต้องมี markdown code block`,
    ]);

    const text = result.response.text().trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return res.status(500).json({ message: 'วิเคราะห์ไม่ได้ กรุณาลองใหม่' });

    const parsed = JSON.parse(jsonMatch[0]);
    res.json(parsed);
  } catch (err) {
    console.error('Food analysis error:', err.message);
    res.status(500).json({ message: 'วิเคราะห์ไม่สำเร็จ: ' + err.message });
  }
};
