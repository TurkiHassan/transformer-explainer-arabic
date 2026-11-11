<script>
	import tailwindConfig from '../../../tailwind.config';
	import resolveConfig from 'tailwindcss/resolveConfig';
	import Katex from '~/utils/Katex.svelte';
</script>

<div id="description">
	<div class="article-section" data-click="article-intro">
		<h1>ما هو نموذج الترانسفورمر؟ (Transformer)</h1>

		<p>
			الترانسفورمر (<strong>Transformer</strong>) هو معمارية شبكات عصبية أحدثت ثورة جذرية غيّرت مسار الذكاء الاصطناعي بالكامل. قُدِّم الترانسفورمر لأول مرة في الورقة البحثية التاريخية
			<a
				href="https://dl.acm.org/doi/10.5555/3295222.3295349"
				title="ACM Digital Library"
				target="_blank">"Attention is All You Need"</a
			>
			في عام 2017، ومنذ ذلك الحين أصبح المعمارية الأساسية المهيمنة على نماذج التعلم العميق (Deep Learning)، مشغلاً أقوى النماذج التوليدية للنصوص مثل <strong>GPT</strong> من OpenAI، و <strong>Llama</strong> من Meta، و <strong>Gemini</strong> من Google. ولا يقتصر دور الترانسفورمر على النصوص فحسب، بل يمتد إلى
			<a
				href="https://huggingface.co/learn/audio-course/en/chapter3/introduction"
				title="Hugging Face"
				target="_blank">توليد الصوت (Audio Generation)</a
			>،
			<a
				href="https://huggingface.co/learn/computer-vision-course/unit3/vision-transformers/vision-transformers-for-image-classification"
				title="Hugging Face"
				target="_blank">التعرف على الصور (Vision Transformers)</a
			>،
			<a href="https://elifesciences.org/articles/82819" title="eLife"
				>التنبؤ ببنية البروتينات (Protein Structure)</a
			>، وحتى
			<a
				href="https://www.deeplearning.ai/the-batch/reinforcement-learning-plus-transformers-equals-efficiency/"
				title="Deep Learning AI"
				target="_blank">ألعاب التحدي واتخاذ القرار (Game Playing)</a
			>، مما يبرهن على مرونته الفائقة عبر شتى المجالات.
		</p>
		<p>
			تعمل نماذج الترانسفورمر التوليدية للنصوص جوهرياً وفق مبدأ <strong>التنبؤ بالرمز التالي (Next-Token Prediction)</strong>: بناءً على النص المُدخل (Prompt) من المستخدم، ما هو
			<em>الرمز الأكثر احتمالاً (سواء كان كلمة كاملة أو جزءاً من كلمة)</em> الذي سيعقب هذا المدخل؟ يكمن السر والقوة الدافعة للترانسفورمر في آلية <strong>الانتباه الذاتي (Self-Attention)</strong>، والتي تتيح للنموذج معالجة تسلسل النص بأكمله دفعة واحدة والتقاط العلاقات بعيدة المدى بين الكلمات بكفاءة تتفوق على جميع المعماريات السابقة.
		</p>
		<p>
			تعد عائلة نماذج GPT-2 من أبرز الأمثلة التأسيسية لنماذج الترانسفورمر التوليدية. تعمل أداة Transformer Explainer بنسخة نموذج
			<a href="https://huggingface.co/openai-community/gpt2" title="Hugging Face" target="_blank"
				>GPT-2 (small)</a
			>
			التي تحتوي على 124 مليون معامل (Parameters). ومع أنه ليس النموذج الأحدث أو الأضخم اليوم، إلا أنه يشترك في البنية الأساسية والمبادئ المعمارية نفسها المستخدمة في أحدث نماذج الذكاء الاصطناعي اليوم، مما يجعله نقطة انطلاق مثالية وملموسة لفهم أعماق هذه التقنية.
		</p>
	</div>

	<div class="article-section callout-section" data-click="article-history-intro">
		<div class="callout-box">
			<div class="callout-header">
				<span class="callout-badge">مدخل مفاهيمي</span>
				<h2>ما هي فكرة "الانتباه هو كل ما تحتاجه" (Attention is All You Need)؟ ولماذا أحدثت ثورة؟</h2>
			</div>
			<p>
				لفهم القفزة النوعية التي أحدثها الترانسفورمر، يجب أولاً معرفة كيف كان الذكاء الاصطناعي يتعامل مع اللغات قبل عام 2017.
			</p>
			
			<div class="comparison-grid">
				<div class="comparison-card old">
					<h4>المعماريات السابقة: الشبكات المتكررة (RNNs & LSTMs)</h4>
					<ul>
						<li>
							<strong>المعالجة التسلسلية المتتالية (Sequential Processing)</strong>: كانت تقرأ الجملة كلمة تلو الأخرى من البداية إلى النهاية.
						</li>
						<li>
							<strong>عنق زجاجة الذاكرة وتلاشي التدرج (Memory Bottleneck)</strong>: عند الوصول لنهاية جملة طويلة، يميل النموذج لنسيان بداية النص، ويفقد القدرة على ربط الكلمات المتباعدة بدقة.
						</li>
						<li>
							<strong>استحالة الموازاة على معالجات الرسومات (No Parallelization)</strong>: لا يمكن البدء في معالجة الكلمة العاشرة إلا بعد الانتهاء التام من الكلمة التاسعة، مما جعل تدريب النماذج بطيئاً جداً ومحدوداً.
						</li>
					</ul>
				</div>
				<div class="comparison-card new">
					<h4>ثورة الترانسفورمر: الانتباه الذاتي (Self-Attention)</h4>
					<ul>
						<li>
							<strong>المعالجة المتوازية دفعة واحدة (Fully Parallel)</strong>: يستقبل الترانسفورمر كامل النص مرة واحدة، مما يتيح استغلال القوة الحسابية الخارقة لمعالجات الرسومات (GPUs/TPUs).
						</li>
						<li>
							<strong>الاتصال المباشر بين جميع الكلمات (Direct Attention)</strong>: تستطيع كل كلمة في النص أن تنتبه إلى وتتفاعل مع أي كلمة أخرى مباشرة وبخطوة واحدة، بغض النظر عن المسافة بينهما.
						</li>
						<li>
							<strong>قابلية التوسع غير المسبوقة (Massive Scalability)</strong>: فتح هذا الابتكار الباب لتدريب نماذج بمليارات وتريليونات المعاملات على الإنترنت بالكامل، وولادة عصر نماذج اللغة الكبيرة (LLMs).
						</li>
					</ul>
				</div>
			</div>

			<p class="callout-summary">
				رسالة ورقة <strong>"Attention is All You Need"</strong> كانت جريئة وموجزة:
				<em>"لسنا بحاجة للشبكات المتكررة (RNN) ولا للمرور التسلسلي البطيء؛ آلية الانتباه الذاتي وحدها كافية لربط كل عناصر السياق ببعضها وبأعلى كفاءة ممكنة."</em>
			</p>
		</div>
	</div>

	<div class="article-section architecture-section" data-click="article-overview">
		<h1>معمارية الترانسفورمر (Transformer Architecture)</h1>

		<p>
			يتكون كل نموذج ترانسفورمر لتوليد النصوص من هذه <strong>المكونات الثلاثة الرئيسية</strong>:
		</p>
		<ol>
			<li>
				<strong class="bold-purple">التضمين (Embedding)</strong>: يتم أولاً تقطيع النص المُدخل إلى وحدات أصغر تُسمى رموزاً (Tokens)، قد تكون كلمات أو أجزاء من كلمات. بعد ذلك تُحوَّل هذه الرموز إلى متجهات رقمية تُسمى التضمينات (Embeddings)، وهي متجهات تحمل المعنى الدلالي واللغوي لكل رمز بالإضافة إلى موقعه في الجملة.
			</li>
			<li>
				<strong class="bold-purple">كتلة الترانسفورمر (Transformer Block)</strong>: هي الوحدة البنائية الأساسية التي تعالج البيانات المدخلة وتطور تمثيلها عبر طبقات متعددة. وتتضمن كل كتلة:
				<ul>
					<li>
						<strong>آلية الانتباه (Attention Mechanism)</strong>: المكون الجوهري في كتلة الترانسفورمر. تتيح للرموز التواصل وتبادل المعلومات فيما بينها، مما يمكن النموذج من فهم السياق والعلاقات النحوية والدلالية بين الكلمات.
					</li>
					<li>
						<strong>طبقة شبكة التغذية الأمامية (MLP - Multilayer Perceptron)</strong>: شبكة عصبية تماثلية تعمل على كل رمز بشكل مستقل. فبينما تتولى آلية الانتباه توجيه ونقل المعلومات بين الرموز المختلفة، تتولى طبقة MLP تنقيح وتعميق تمثيل كل رمز بذاته.
					</li>
				</ul>
			</li>
			<li>
				<strong class="bold-purple">احتمالات المخرجات (Output Probabilities)</strong>: في النهاية، تقوم الطبقة الخطية (Linear layer) ودالة سوفت ماكس (Softmax) بتحويل المتجهات النهائية إلى توزيع احتمالي لجميع كلمات القاموس، مما يمكّن النموذج من التنبؤ بالرمز التالي الأكثر ملائمة في التسلسل.
			</li>
		</ol>
	</div>

	<div class="article-section" id="embedding" data-click="article-embedding">
		<h2>التضمين (Embedding)</h2>
		<p>
			لنفترض أنك تريد توليد نص باستخدام نموذج الترانسفورمر، وقمت بإدخال النص التالي: <code>“Data visualization empowers users to”</code>. يحتاج هذا النص إلى التحول لصيغة رقمية يستطيع النموذج قراءتها ومعالجتها حسابياً. هنا يأتي دور مرحلة التضمين: فهي تحول الكلمات إلى متجهات عددية غنية بالمعنى. ولتحويل النص إلى تضمين مكتمل، نمر بأربع خطوات: 1) تقطيع النص (Tokenization)، 2) استخراج تضمين الرموز (Token Embedding)، 3) إضافة معلومات الموضع (Positional Encoding)، وأخيراً 4) جمع تضمين الرمز مع ترميز الموضع للحصول على التضمين النهائي. دعنا نرى تفاصيل كل خطوة:
		</p>
		<div class="figure">
			<img src="./article_assets/embedding.png" width="65%" alt="مخطط طبقة التضمين" />
		</div>
		<div class="figure-caption">
			شكل <span class="attention">1</span>. تفصيل طبقة التضمين، يوضح كيفية تحويل النص المدخل إلى متجهات عددية عبر أربع مراحل:
			<span class="fig-numbering">(1)</span> التقطيع (Tokenization)،
			(2) تضمين الرموز (Token Embedding)،
			(3) الترميز الموضعي (Positional Encoding)،
			و (4) التضمين النهائي (Final Embedding).
		</div>
		<div class="article-subsection">
			<h3>الخطوة 1: التقطيع (Tokenization)</h3>
			<p>
				التقطيع (<strong>Tokenization</strong>) هو عملية تجزئة النص المدخل إلى وحدات أصغر سهلة الإدارة تُسمى رموزاً (Tokens). قد يمثل الرمز كلمة كاملة أو مقطعاً صرفياً. فمثلاً الكلمتان <code>"Data"</code> و <code>"visualization"</code> تقابل كل منهما رمزاً مستقلاً، بينما كلمة مثل <code>"empowers"</code> يتم تقسيمها إلى مقطعين (رمزين). يُحدّد قاموس الرموز (Vocabulary) مسبقاً قبل تدريب النموذج: يحتوي قاموس نموذج GPT-2 على <code>50,257</code> رمزاً فريداً لكل منها معرّف رقمي (Token ID).
			</p>
		</div>
		<div class="article-subsection" id="article-token-embedding">
			<h3>الخطوة 2: تضمين الرمز (Token Embedding)</h3>
			<p>
				يمثل نموذج GPT-2 (small) كل رمز في القاموس بمتجه عددي بأبعاد قدرها 768 بُعداً (تختلف الأبعاد باختلاف حجم النموذج). يتم تخزين هذه المتجهات في مصفوفة ضخمة أبعادها <code>(50,257, 768)</code> تضم ما يقارب 39 مليون معامل! تسمح هذه المصفوفة للنموذج بربط كل رمز بمعنى دلالي؛ حيث تتوضع الكلمات المتقاربة في المعنى أو الاستخدام السياقي قريبة من بعضها في هذا الفضاء الرياضي متعدد الأبعاد، بينما تتباعد الكلمات المختلفة دلالياً.
			</p>
		</div>
		<div class="article-subsection" id="article-positional-embedding">
			<h3>الخطوة 3: الترميز الموضعي (Positional Encoding)</h3>
			<p>
				نظراً لأن الترانسفورمر يعالج جميع الرموز في الوقت نفسه بدون ترتيب تسلسلي متأصل، يجب تزويده بمعلومات تدل على ترتيب وموقع كل كلمة في الجملة. هناك طرق متعددة للترميز الموضعي؛ يتبع نموذج GPT-2 نهج تدريب مصفوفة موضعية خاصة به بالكامل من البداية (Learned Positional Embeddings)، حيث يتعلم متجه الموضع بالتزامن مع تدريب النموذج.
			</p>
		</div>
		<div class="article-subsection">
			<h3>الخطوة 4: التضمين النهائي (Final Embedding)</h3>
			<p>
				في النهاية، نقوم بجمع متجه تضمين الرمز مع متجه ترميز موضعه جمعاً عنصرياً بسيطاً. هذا التمثيل المدمج يجمع بدقة بين المعنى الدلالي للكلمة وموقعها الفعلي في تسلسل النص المدخل.
			</p>
		</div>
	</div>

	<div class="article-section" data-click="article-transformer-block">
		<h2>كتلة الترانسفورمر (Transformer Block)</h2>

		<p>
			يقع قلب المعالجة الحسابية للترانسفورمر في كتلة الترانسفورمر، والتي تتألف من آليتين أساسيتين: الانتباه الذاتي متعدد الرؤوس (Multi-Head Self-Attention) وطبقة شبكة التغذية الأمامية (MLP). تتكون معظم النماذج من عدة كتل متتالية مكدسة فوق بعضها البعض. وتتطور تمثيلات الرموز تدريجياً عبر الطبقات، من الكتلة الأولى حتى الأخيرة، مما يسمح للنموذج ببناء فهم تراكمي معقد وعالي التجريد للنص. يحتوي نموذج GPT-2 (small) الذي نستكشفه هنا على <code>12</code> كتلة ترانسفورمر متتالية.
		</p>
	</div>

	<div class="article-section" id="self-attention" data-click="article-attention">
		<h3>الانتباه الذاتي متعدد الرؤوس (Multi-Head Self-Attention)</h3>
		<p>
			تمكّن آلية الانتباه الذاتي النموذج من رصد العلاقات المتبادلة بين جميع الرموز في الجملة، بحيث يتأثر تمثيل كل رمز بالسياق المحيط به. وتتيح الرؤوس المتعددة (Multiple Attention Heads) للنموذج النظر إلى هذه العلاقات من زوايا متعددة في آن واحد؛ على سبيل المثال، قد يركز أحد الرؤوس على الروابط النحوية القريبة بينما يركز رأس آخر على المعنى الدلالي العام أو مرجعيات الضمائر البعيدة. دعنا نستعرض خطوات حساب الانتباه الذاتي بالتفصيل:
		</p>
		<div class="article-subsection-l2">
			<h4>الخطوة 1: مصفوفات الاستعلام والمفتاح والقيمة (Query, Key, and Value Matrices)</h4>

			<div class="figure pt-10">
				<img src="./article_assets/QKV.png" width="80%" alt="حساب مصفوفات QKV" />
				<div class="text-xs">
					<Katex
						displayMode
						math={`
		QKV_{ij} = ( \\sum_{d=1}^{768} \\text{Embedding}_{i,d} \\cdot \\text{Weights}_{d,j}) + \\text{Bias}_j
		`}
					/>
				</div>
			</div>
			<div class="figure-caption">
				شكل <span class="attention">2</span>. حساب مصفوفات الاستعلام (Query) والمفتاح (Key) والقيمة (Value) انطلاقاً من متجه التضمين الأصلي.
			</div>

			<p>
				يتم تحويل متجه تضمين كل رمز إلى ثلاثة متجهات مميزة:
				<span class="q-color">الاستعلام Query (Q)</span>،
				<span class="k-color">المفتاح Key (K)</span>، و
				<span class="v-color">القيمة Value (V)</span>. تُحسب هذه المتجهات عن طريق ضرب مصفوفة التضمين المدخلة في مصفوفات أوزان يتم تعلّمها خلال التدريب لكل من
				<span class="q-color">Q</span> و
				<span class="k-color">K</span> و
				<span class="v-color">V</span>. ولتقريب الفكرة، يمكن استخدام تشبيه محرك البحث:
			</p>
			<ul>
				<li>
					<strong class="q-color font-medium">الاستعلام Query (Q)</strong>: هو نص البحث الذي تكتبه في شريط محرك البحث. وهو يمثل الرمز الحالي الذي يريد
					<em>"البحث عن معلومات ذات صلة به في بقية النص"</em>.
				</li>
				<li>
					<strong class="k-color font-medium">المفتاح Key (K)</strong>: هو عنوان كل صفحة ويب تظهر في نافذة نتائج البحث. ويمثل الرموز المتاحة التي يمكن للاستعلام أن ينتبه إليها.
				</li>
				<li>
					<strong class="v-color font-medium">القيمة Value (V)</strong>: هو المحتوى الفعلي للصفحة. فبمجرد أن يتطابق الاستعلام (Query) مع المفتاح المناسب (Key)، نريد الحصول على المحتوى الفعلي (Value) لأكثر الصفحات صلة وأهمية.
				</li>
			</ul>
			<p>
				باستخدام قيم QKV هذه، يحسب النموذج درجات الانتباه (Attention Scores) التي تحدد مقدار التركيز والوزن الذي يجب أن يمنحه كل رمز لسائر الرموز الأخرى عند توليد التوقعات.
			</p>
		</div>
		<div class="article-subsection-l2">
			<h4>الخطوة 2: تقسيم الرؤوس المتعددة (Multi-Head Splitting)</h4>
			<p>
				تُقسّم متجهات <span class="q-color">الاستعلام (Query)</span> و <span class="k-color">المفتاح (Key)</span> و <span class="v-color">القيمة (Value)</span> إلى رؤوس متعددة—في حالة نموذج GPT-2 (small)، تُقسّم إلى <code>12</code> رأساً. يعالج كل رأس شريحة من أبعاد التضمين باستقلالية تامة، مما يسمح بالتقاط علاقات نحوية ودلالية مختلفة ومتنوعة بالتوازي.
			</p>
		</div>
		<div class="article-subsection-l2">
			<h4>الخطوة 3: الانتباه الذاتي المقنّع (Masked Self-Attention)</h4>
			<p>
				داخل كل رأس انتباه، نُجري حسابات الانتباه الذاتي المقنّع. تتيح هذه الآلية للنموذج توليد النصوص من خلال التركيز على الأجزاء السابقة مع منعه تماماً من الاطلاع على الكلمات المستقبلية التي لم تُولّد بعد.
			</p>

			<div class="figure">
				<img src="./article_assets/attention.png" width="80%" align="middle" alt="حساب الانتباه المقنع" />
			</div>
			<div class="figure-caption">
				شكل <span class="attention">3</span>. استخدام مصفوفات الاستعلام والمفتاح والقيمة لحساب الانتباه الذاتي المقنع (Masked Self-Attention).
			</div>

			<ul>
				<li>
					<strong>الضرب النقطي (Dot Product)</strong>: ينتج عن ضرب مصفوفة <span class="q-color">الاستعلام (Query)</span> في منقول مصفوفة <span class="k-color">المفتاح (Key)</span> ما يُعرف بـ <strong>درجات الانتباه (Attention Scores)</strong>، وهي مصفوفة مربعة تعكس درجة تقارب وقوة العلاقة بين كل زوج من الرموز.
				</li>
				<li>
					<strong>التحجيم والقناع (Scaling · Mask)</strong>: يتم قياس درجات الانتباه بالقسمة على الجذر التربيعي لأبعاد الرأس (لتحقيق الاستقرار العددي)، ثم يُطبّق قناع (Mask) على المثلث العلوي من المصفوفة بجعل قيمه سالباً لا نهائياً (<Katex math={'-\\infty'} />) لمنع النموذج من "التلصص" على المستقبل؛ فالنموذج يجب أن يتعلم التنبؤ بالكلمة التالية بالاعتماد حصراً على ما سبقها.
				</li>
				<li>
					<strong>سوفت ماكس والإسقاط (Softmax · Dropout)</strong>: بعد التحجيم وتطبيق القناع، تُحوّل درجات الانتباه إلى احتمالات حقيقية عبر دالة سوفت ماكس (Softmax) بحيث يصبح مجموع كل صف مساوياً لـ 1، وتدل كل قيمة على وزن وأهمية كل كلمة سابقة للكلمة الحالية.
				</li>
			</ul>
		</div>
		<div class="article-subsection-l2">
			<h4>الخطوة 4: المخرجات ودمج الرؤوس (Output and Concatenation)</h4>
			<p>
				يقوم النموذج بعد ذلك بضرب أوزان الانتباه المحسوبة في مصفوفة <span class="v-color">القيمة (Value)</span> للحصول على
				<span class="purple-color">المخرج النهائي</span>
				لرأس الانتباه. ونظراً لأن نموذج GPT-2 يمتلك <code>12</code> رأس انتباه، فإن مخرجات جميع هذه الرؤوس تُدمج معاً (Concatenation) ثم تُمرر عبر طبقة إسقاط خطي نهائية لتوحيد الأبعاد مجدداً.
			</p>
		</div>
	</div>

	<div class="article-section" id="article-activation" data-click="article-mlp">
		<h3>شبكة التغذية الأمامية (MLP: Multi-Layer Perceptron)</h3>

		<div class="figure">
			<img src="./article_assets/mlp.png" width="70%" align="middle" alt="طبقة MLP" />
		</div>
		<div class="figure-caption">
			شكل <span class="attention">4</span>. استخدام طبقة MLP لإسقاط مخرجات الانتباه الذاتي إلى فضاء ذي أبعاد أعلى لتعزيز القدرة التعبيرية للنموذج.
		</div>

		<p>
			بعد أن تلتقط رؤوس الانتباه العلاقات المعقدة بين الكلمات، تُمرر المخرجات المدمجة إلى طبقة شبكة التغذية الأمامية متعددة الطبقات (MLP) لتعميق قدرة النموذج التمثيلية. تتألف كتلة MLP من تحويلين خطيين وبينهما دالة تنشيط غير خطية من نوع
			<a
				href="https://en.wikipedia.org/wiki/Rectified_linear_unit#Gaussian-error_linear_unit_(GELU)"
				target="_blank">GELU</a
			>.
		</p>
		<p>
			يقوم التحويل الخطي الأول بتوسيع أبعاد المتجه بمقدار 4 أضعاف، من <code>768</code> إلى <code>3072</code> بُعداً. تتيح هذه التوسعة (Expansion) للنموذج إسقاط تمثيلات الرموز في فضاء أعلى أبعاداً يستطيع من خلاله التقاط أنماط معقدة وعلاقات لغوية غنية يصعب تمثيلها في الأبعاد الأصلية.
		</p>
		<p>
			أما التحويل الخطي الثاني، فيقوم بضغط الأبعاد وإعادتها إلى الحجم الأصلي <code>768</code>. تعيد هذه الخطوة المتجهات لحجمها الطبيعي مع الحفاظ على الأنماط غير الخطية المفيدة التي اكتسبتها في مرحلة التوسيع والتنشيط.
		</p>
		<p>
			على عكس آلية الانتباه الذاتي التي تدمج المعلومات وتوزعها بين الرموز المختلفة، تعالج طبقة MLP كل رمز بشكل مستقل ومعزول، مما يثري ذاكرة النموذج وقدرته الاستيعابية العامة.
		</p>
	</div>

	<div class="article-section" id="article-prob" data-click="article-prob">
		<h2>احتمالات المخرجات (Output Probabilities)</h2>
		<p>
			بعد معالجة النص عبر جميع كتل الترانسفورمر الـ 12، يُمرر التمثيل النهائي عبر طبقة خطية ختامية للتحضير لتوقع الرمز التالي. تُسقط هذه الطبقة المتجه النهائي في فضاء أبعاده بحجم القاموس <code>50,257</code>، حيث يحصل كل رمز في القاموس على درجة خام تُسمى <code>logit</code>. وبما أن أي كلمة في اللغة يمكن نظرياً أن تكون الكلمة التالية، تسمح لنا هذه الدرجات بترتيب الكلمات بحسب أرجحيتها، ثم نطبق دالة سوفت ماكس (Softmax) لتحويل هذه الدرجات إلى توزيع احتمالي حقيقي مجموعه يساوي 1 (100%).
		</p>

		<div class="figure py-5">
			<img src="./article_assets/softmax.png" width="70%" alt="دالة سوفت ماكس والاحتمالات" />
		</div>
		<div class="figure-caption">
			شكل <span class="attention">5</span>. يُمنح كل رمز في القاموس احتمالاً رياضياً بناءً على مخرجات Logits، وتحدد هذه النسب احتمالية اختيار كل كلمة كرمز تالٍ في الجملة.
		</div>

		<p id="article-temperature" data-click="article-temperature">
			الخطوة الأخيرة هي اختيار الرمز التالي من خلال أخذ العينات (Sampling) من هذا التوزيع. هنا يلعب معامل <code>الحرارة (Temperature)</code> دوراً جوهرياً في ضبط سلوك النموذج. رياضياً، العملية بسيطة جداً: نقوم بقسمة قيم اللوجيتس (logits) على قيمة <code>الحرارة (Temperature)</code> قبل تمريرها لسوفت ماكس:
		</p>

		<ul>
			<li>
				<code>temperature = 1</code>: القسمة على 1 لا تغير قيم اللوجيتس ويبقى التوزيع الاحتمالي القياسي كما تعلمه النموذج.
			</li>
			<li>
				<code>temperature &lt; 1</code>: درجة الحرارة المنخفضة تجعل النموذج أكثر ثقة وتحديداً، حيث تزيد الفارق بين الكلمات الأكثر ترجيحاً والكلمات الأخرى، مما يؤدي إلى نصوص أكثر قابلية للتنبؤ واستقراراً.
			</li>
			<li>
				<code>temperature &gt; 1</code>: درجة الحرارة المرتفعة تفرّط التوزيع الاحتمالي وتجعله أكثر تسطحاً، مما يمنح الكلمات الأقل احتمالاً فرصة للظهور، وهو ما يفسح المجال للمزيد من العشوائية وما يسميه البعض "إبداع" النموذج (Creativity).
			</li>
		</ul>

		<p id="article-sampling" data-click="article-sampling">
			بالإضافة إلى ذلك، يمكن ضبط عملية أخذ العينات بدقة أكبر باستخدام معاملي <code>top-k</code> و <code>top-p</code>:
		</p>
		<ul>
			<li>
				<code>أخذ العينات بأعلى ك (top-k sampling)</code>: يحصر خيارات التوليد في أعلى k من الرموز الأكثر احتمالاً فقط، متجاهلاً بقية القاموس تماماً لتجنب توليد كلمات غير منطقية.
			</li>
			<li>
				<code>أخذ العينات بالاحتمال التراكمي (top-p sampling)</code>: يختار أصغر مجموعة من الكلمات التي يبلغ مجموع احتمالاتها المتراكمة نسبة p (مثلاً 90%)، مما يسمح بحجم خيارات ديناميكي يتكيف مع ثقة النموذج في كل خطوة.
			</li>
		</ul>
		<p>
			من خلال الموازنة بين <code>temperature</code> و <code>top-k</code> و <code>top-p</code>، يمكنك توجيه النموذج ليكون دقيقاً ومحدداً أو متنوعاً ومبتكراً وفق متطلبات مهمتك.
		</p>
	</div>

	<div class="article-section" data-click="article-advanced-features">
		<h2>مكونات معمارية مساعدة (Auxiliary Architectural Features)</h2>

		<p>
			توجد عدة آليات معمارية مساعدة تساهم بفاعلية في نجاح واستقرار نماذج الترانسفورمر. ورغم أنها ليست جوهر فكرة الانتباه، إلا أنها ضرورية جداً أثناء عملية التدريب لضمان تقارب النموذج واستقراره الرياضي:
		</p>
		<div class="article-subsection" id="article-ln">
			<h3>تطبيع الطبقات (Layer Normalization)</h3>

			<p>
				يساعد تطبيع الطبقات (Layer Normalization) على استقرار تدريب الشبكة وتسريع تقاربها. ويعمل عبر ضبط مدخلات الطبقة لتمتلك توزيعاً إحصائياً معيارياً (متوسط حسابي صفر وتباين واحد). يقلل هذا التطبيع من تباين التوزيعات الداخلية ويجعل الشبكة أقل حساسية للقيم الأولية للأوزان. يُطبّق تطبيع الطبقات مرتين داخل كل كتلة ترانسفورمر: مرة قبل آلية الانتباه، ومرة قبل طبقة MLP.
			</p>
		</div>
		<div class="article-subsection" id="article-dropout">
			<h3>الإسقاط العشوائي (Dropout)</h3>

			<p>
				الإسقاط (Dropout) هو أسلوب تنظيم (Regularization) لمنع فرط التخصيص (Overfitting) في الشبكات العصبية، وذلك من خلال إيقاف تنشيط نسبة عشوائية من الخلايا العصبية أثناء التدريب. يدفع هذا الإجراء النموذج للاعتماد على ميزات متعددة وقوية بدلاً من الاعتماد على مسار وحيد. وأثناء مرحلة التوليد الفعلي (Inference)، يتم إيقاف الإسقاط بالكامل للاستفادة من كامل قدرة النموذج.
			</p>
		</div>
		<div class="article-subsection" id="article-residual">
			<h3>اتصالات التخطي المتبقية (Residual Connections)</h3>

			<p>
				قُدّمت اتصالات التخطي المتبقية (Residual Connections) أول مرة في معمارية ResNet عام 2015 وأحدثت نقلة هائلة في إمكانية تدريب شبكات عميقة جداً. وهي باختصار مسارات سريعة تتيح لمدخلات الطبقة تجاوزها والجمع مباشرة مع مخرجاتها. يحل هذا الاتصال مشكلة تلاشي التدرج (Vanishing Gradient Problem) ويضمن تدفق الإشارات والتحديثات بسلاسة عبر طبقات النموذج الكثيرة دون انقطاع.
			</p>
		</div>
	</div>

	<div class="article-section" data-click="article-interactive-features">
		<h1>الميزات التفاعلية في هذه الأداة</h1>
		<p>
			صُممت أداة Transformer Explainer لتكون تفاعلية بالكامل لتمكينك من استكشاف الأعماق الرياضية للترانسفورمر بنفسك:
		</p>

		<ul>
			<li>
				<strong>أدخل نصك الخاص (Input Form)</strong> لترى خطوة بخطوة كيف يعالجه النموذج ويتنبأ بالكلمة التالية. تفقّد أوزان الانتباه والحسابات الوسيطة في كل مرحلة.
			</li>
			<li>
				<strong>تحكم بشريط الحرارة (Temperature Slider)</strong> لملاحظة أثر تغيير قيمة الحرارة على مدى عشوائية أو تحديد التوزيع الاحتمالي للكلمات.
			</li>
			<li>
				<strong>جرّب خيارات أخذ العينات (top-k و top-p)</strong> وشاهد كيف يتغير منحنى الاحتمالات واستبعاد الخيارات الأقل ترجيحاً.
			</li>
			<li>
				<strong>تفاعل مع خرائط الانتباه (Attention Maps)</strong> ومرر المؤشر فوق أي رمز لتكتشف درجة تركيز النموذج على الكلمات الأخرى وكيف يلتقط السياق.
			</li>
		</ul>
	</div>

	<div class="article-section" data-click="article-video">
		<h2>فيديو توضيحي (Video Tutorial)</h2>
		<div class="video-container">
			<iframe
				src="https://www.youtube.com/embed/ECR4oAwocjs"
				title="Transformer Explainer Video Tutorial"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			>
			</iframe>
		</div>
	</div>

	<div class="article-section" data-click="article-implementation">
		<h2>كيف تم بناء وتطوير أداة Transformer Explainer؟</h2>
		<p>
			تتميز أداة Transformer Explainer بتشغيل نموذج GPT-2 (small) حقيقي ومباشر بالكامل داخل متصفحك. يستند هذا النموذج إلى بناء PyTorch من مشروع
			<a href="https://github.com/karpathy/nanoGPT" title="Github" target="_blank"
				>nanoGPT لـ Andrej Karpathy</a
			>
			وقد تم تحويله إلى صيغة
			<a href="https://onnxruntime.ai/" title="ONNX" target="_blank">ONNX Runtime</a>
			للتشغيل فائق السرعة عبر محرك الويب بالمتصفح دون الحاجة لخادم سحابي. واجهة المستخدم مبنية باستخدام لغة JavaScript مع إطار العمل
			<a href="https://kit.svelte.dev/" title="Svelte" target="_blank">Svelte</a>
			ومكتبة
			<a href="https://d3js.org/" title="D3" target="_blank">D3.js</a>
			لإنشاء المخططات والرسوم البيانية التفاعلية الديناميكية.
		</p>
	</div>

	<div class="article-section" data-click="article-credit">
		<h2>فريق التطوير والتقدير (Credits)</h2>
		<p>
			تم تطوير أداة Transformer Explainer الأصلية بواسطة فريق باحثي Georgia Institute of Technology:
			<a href="https://aereeeee.github.io/" target="_blank">Aeree Cho</a>،
			<a href="https://www.linkedin.com/in/chaeyeonggracekim/" target="_blank">Grace C. Kim</a>،
			<a href="https://alexkarpekov.com/" target="_blank">Alexander Karpekov</a>،
			<a href="https://alechelbling.com/" target="_blank">Alec Helbling</a>،
			<a href="https://zijie.wang/" target="_blank">Jay Wang</a>،
			<a href="https://seongmin.xyz/" target="_blank">Seongmin Lee</a>،
			<a href="https://bhoov.com/" target="_blank">Benjamin Hoover</a>، و
			<a href="https://poloclub.github.io/polochau/" target="_blank">Polo Chau</a>
			في مختبر <a href="https://poloclub.github.io/" target="_blank">Polo Club of Data Science</a>.
		</p>
		<p class="arabic-credit">
			تم تعريب الأداة بالكامل وإضافة الشروح المفاهيمية لخدمة الباحثين والطلاب والمهتمين بالذكاء الاصطناعي في الوطن العربي، مع الحفاظ على دقة المصطلحات التقنية العالمية والمراجع الأصلية.
		</p>
	</div>
</div>

<style lang="scss">
	a {
		color: theme('colors.blue.500');

		&:hover {
			color: theme('colors.blue.700');
		}
	}

	.bold-purple {
		color: theme('colors.purple.700');
		font-weight: bold;
	}

	code {
		color: theme('colors.gray.600');
		background-color: theme('colors.gray.100');
		padding: 0.15rem 0.35rem;
		border-radius: 4px;
		font-family: theme('fontFamily.mono');
		direction: ltr;
		display: inline-block;
	}

	.q-color {
		color: theme('colors.blue.500');
	}

	.k-color {
		color: theme('colors.red.500');
	}

	.v-color {
		color: theme('colors.green.600');
	}

	.purple-color {
		color: theme('colors.purple.600');
	}

	.article-section {
		padding-bottom: 2rem;
	}
	.architecture-section {
		padding-top: 1rem;
	}
	.video-container {
		position: relative;
		padding-bottom: 56.25%; /* 16:9 aspect ratio */
		height: 0;
		overflow: hidden;
		max-width: 100%;
		background: #000;
		border-radius: 8px;
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	#description {
		padding-bottom: 3rem;
		margin-left: auto;
		margin-right: auto;
		max-width: 78ch;
		direction: rtl;
		text-align: right;
	}

	#description h1 {
		color: theme('colors.purple.700');
		font-size: 2.1rem;
		font-weight: 600;
		padding-top: 1.5rem;
		line-height: 1.3;
	}

	#description h2 {
		color: theme('colors.purple.700');
		font-size: 1.75rem;
		font-weight: 600;
		padding-top: 1.25rem;
		line-height: 1.35;
	}

	#description h3 {
		color: theme('colors.gray.800');
		font-size: 1.45rem;
		font-weight: 500;
		padding-top: 1rem;
	}

	#description h4 {
		color: theme('colors.gray.800');
		font-size: 1.25rem;
		font-weight: 500;
		padding-top: 0.75rem;
	}

	#description p {
		margin: 1rem 0;
		line-height: 1.8;
	}

	#description p img {
		vertical-align: middle;
	}

	#description .figure-caption {
		font-size: 0.85rem;
		margin-top: 0.5rem;
		text-align: center;
		margin-bottom: 2rem;
		color: theme('colors.gray.500');
	}

	#description ol {
		margin-right: 2rem;
		margin-left: 0;
		list-style-type: decimal;
	}

	#description ul {
		list-style-type: disc;
		margin-right: 2rem;
		margin-left: 0;
		margin-bottom: 1rem;
	}

	#description li {
		margin: 0.6rem 0;
		line-height: 1.75;
	}

	#description p,
	#description div,
	#description li {
		color: theme('colors.gray.700');
	}

	#description small {
		font-size: 0.8rem;
	}

	#description ol li img {
		vertical-align: middle;
	}

	#description a:hover {
		text-decoration: underline;
	}

	.figure,
	.video {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Callout Box for "Attention is All You Need" intro */
	.callout-box {
		background: linear-gradient(135deg, rgba(243, 232, 255, 0.5) 0%, rgba(238, 242, 255, 0.6) 100%);
		border: 1px solid rgba(192, 132, 252, 0.35);
		border-radius: 12px;
		padding: 1.75rem;
		margin: 1.5rem 0;
		box-shadow: 0 4px 15px -3px rgba(147, 51, 234, 0.07);

		.callout-header {
			margin-bottom: 1rem;

			.callout-badge {
				display: inline-block;
				font-size: 0.75rem;
				font-weight: 600;
				color: theme('colors.purple.700');
				background-color: theme('colors.purple.100');
				padding: 0.2rem 0.6rem;
				border-radius: 9999px;
				margin-bottom: 0.5rem;
			}

			h2 {
				color: theme('colors.purple.800') !important;
				font-size: 1.6rem !important;
				margin: 0 !important;
				padding: 0 !important;
			}
		}

		.comparison-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1.25rem;
			margin: 1.25rem 0;

			@media (max-width: 640px) {
				grid-template-columns: 1fr;
			}

			.comparison-card {
				background: white;
				border-radius: 8px;
				padding: 1.1rem;
				border: 1px solid theme('colors.gray.200');

				h4 {
					margin-top: 0 !important;
					padding-top: 0 !important;
					font-size: 1.05rem !important;
					font-weight: 600 !important;
					margin-bottom: 0.75rem;
				}

				&.old {
					border-right: 4px solid theme('colors.amber.400');
					h4 {
						color: theme('colors.amber.700') !important;
					}
				}

				&.new {
					border-right: 4px solid theme('colors.purple.500');
					h4 {
						color: theme('colors.purple.700') !important;
					}
				}

				ul {
					margin-right: 1.25rem;
					margin-bottom: 0;
				}

				li {
					font-size: 0.9rem;
					line-height: 1.6;
					margin: 0.4rem 0;
				}
			}
		}

		.callout-summary {
			background: rgba(255, 255, 255, 0.8);
			padding: 0.9rem 1.2rem;
			border-radius: 8px;
			font-size: 0.95rem;
			border-right: 3px solid theme('colors.purple.600');
			margin: 1rem 0 0 0 !important;
			color: theme('colors.purple.900') !important;
		}
	}

	.arabic-credit {
		margin-top: 1rem !important;
		padding: 0.85rem 1.2rem;
		background: theme('colors.purple.50');
		border-radius: 8px;
		border-right: 3px solid theme('colors.purple.600');
		font-size: 0.95rem;
		color: theme('colors.purple.900') !important;
	}
</style>
