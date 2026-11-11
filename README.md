# مُفسِّر الترانسفورمر (Transformer Explainer بالعربية)
### أداة بصرية وتفاعلية لفهم نماذج الذكاء الاصطناعي التوليدية ونماذج اللغة الكبيرة (LLMs)

أداة تفاعلية مصممة لمساعدة الطلاب والباحثين والمطورين وعموم المهتمين على تعلّم وفهم كيف تعمل نماذج **الترانسفورمر (Transformer)** مثل عائلة **GPT**. 
تُشغّل هذه الأداة نموذج **GPT-2** حقيقي ومباشر بالكامل داخل متصفحك، مما يتيح لك تجربة إدخال نصوصك الخاصة ومراقبة العمليات الحسابية والمصفوفات الرياضية لحظياً في كل مرحلة لتوقع الرمز التالي (Next-Token Prediction).

---

## 🌟 مميزات النسخة العربية (Arabic Edition)
- **تعريب شامل ودقيق**: واجهة مستخدم ودليل تعليمي تفاعلي (Interactive Textbook) ومقالة علمية معرّبة بالكامل بلغة عربية سلسلة وسليمة.
- **الحفاظ على المصطلحات التقنية**: بقاء المصطلحات التقنية العالمية باللغة الإنجليزية إلى جانب ترجمتها العربية لتسهيل الفهم والمتابعة (مثل: `Embedding (تضمين)`، `Attention (الانتباه)`، `Query (الاستعلام)`، `Key (المفتاح)`، `Value (القيمة)`، `MLP (شبكة التغذية الأمامية)`).
- **مدخل مفاهيمي لورقة "Attention is All You Need"**: قسم إضافي يشرح سياق التحول من الشبكات العصبية المتكررة (RNNs/LSTMs) إلى آلية الانتباه الذاتي، ولماذا مهدت الطريق لعصر النماذج اللغوية الكبيرة (LLMs).
- **الحفاظ على انسيابية المخطط البصري**: الحفاظ على مسار وتدفق العمليات الحسابية من اليسار إلى اليمين (LTR) لضمان الدقة الرياضية لمصفوفات D3 وتطابق الرسوم البيانية.

---

## 🚀 التشغيل المحلي (How to Run Locally)

### المتطلبات الأساسية
- **Node.js**: الإصدار 18 أو 20 أو أعلى.
- **NPM**: الإصدار 9 أو 10 أو أعلى.

### خطوات التثبيت والتشغيل

1. **استنساخ المستودع (Clone the repository)**:
   ```bash
   git clone <URL_TO_YOUR_NEW_REPO>
   cd Transformer-Explainer
   ```

2. **تثبيت الحزم البرمجية (Install dependencies)**:
   ```bash
   npm install
   ```

3. **تشغيل خادم التطوير (Run dev server)**:
   ```bash
   npm run dev
   ```

4. **فتح التطبيق في المتصفح**:
   افتح الرابط التالي في المتصفح:
   ```
   http://localhost:5173
   ```

5. **بناء النسخة الإنتاجية (Production Build)**:
   ```bash
   npm run build
   ```
   سيتم توليد ملفات الموقع الثابتة (Static Site) في مجلد `build/` وهي جاهزة للنشر مباشرة على GitHub Pages أو Cloudflare Pages أو Vercel.

---

## 🏗️ التقنيات المستخدمة (Tech Stack)
- **Framework**: [SvelteKit](https://kit.svelte.dev/) / Svelte 4
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Flowbite Svelte
- **Visualization**: [D3.js](https://d3js.org/) & GSAP
- **In-Browser Model Inference**: [ONNX Runtime Web](https://onnxruntime.ai/) لتشغيل نموذج GPT-2 الصغير (124M parameters) محلياً بدون خوادم خارجية
- **Math Rendering**: KaTeX

---

## 👥 فريق التطوير والتقدير (Credits)

تم ابتكار وتطوير أداة **Transformer Explainer** الأصلية من قِبل باحثي جامعة جورجيا تك (Georgia Institute of Technology):
- **Aeree Cho**, **Grace C. Kim**, **Alexander Karpekov**, **Alec Helbling**, **Jay Wang**, **Seongmin Lee**, **Benjamin Hoover**, و **Polo Chau** في مختبر [Polo Club of Data Science](https://poloclub.github.io/).
- المستودع الأصلي: [poloclub/transformer-explainer](https://github.com/poloclub/transformer-explainer).
- الفيديو التوضيحي الأصلي على يوتيوب: [Transformer Explainer Demo Video](https://youtu.be/TFUc41G2ikY).

### الورقة البحثية الأصلية (Paper Citation)

```bibTeX
@inproceedings{cho2026transformer,
  title={Transformer Explainer: Learning LLM Transformers with Interactive Visual Explanation and Experimentation},
  author={Cho, Aeree and Kim, Grace C and Karpekov, Alexander and Lee, Seongmin and Helbling, Alec and Hoover, Benjamin and Wang, Zijie J and Kahng, Minsuk and Chau, Duen Horng},
  booktitle={Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems},
  pages={1--21},
  year={2026}
}
```

---

## 📜 الترخيص (License)
هذا المشروع مفتوح المصدر ومتاح تحت رخصة [MIT License](LICENSE).
