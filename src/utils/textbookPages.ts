import { get } from 'svelte/store';
import {
	expandedBlock,
	weightPopover,
	isBoundingBoxActive,
	textbookCurrentPageId,
	isExpandOrCollapseRunning,
	isFetchingModel,
	userId
} from '~/store';
import {
	highlightElements,
	removeHighlightFromElements,
	applyTransformerBoundingHeight,
	resetElementsHeight,
	highlightAttentionPath,
	removeAttentionPathHighlight,
	removeFingerFromElements
} from '~/utils/textbook';
import { drawResidualLine } from './animation';

export interface TextbookPage {
	id: string;
	title: string;
	content?: string;
	component?: any;
	timeoutId?: number;
	on: () => void;
	out: () => void;
	complete?: () => void;
}

const { drawLine, removeLine } = drawResidualLine();

export const textPages: TextbookPage[] = [
	{
		id: 'what-is-transformer',
		title: 'ما هو الترانسفورمر؟ (Transformer)',
		content: `<p>يُعد الـ <strong>Transformer (الترانسفورمر)</strong> البنية التحتية والعمود الفقري للذكاء الاصطناعي التوليدي المعاصر، وهو المحرك الأساسي لنماذج رائدة مثل ChatGPT و Gemini و Claude. قُدّم لأول مرة في الورقة البحثية التاريخية "Attention is All You Need" عام 2017، وأحدث ثورة جذرية في كيفية معالجة النماذج للبيانات. تُستخدم نفس البنية في مرحلتي التدريب على البيانات الضخمة وتوليد المخرجات (Inference). هنا نستخدم نموذج GPT-2 (النسخة الصغيرة)، وهو أبسط من النماذج الحديثة لكنه مثالي ومطابق لفهم المبادئ الأساسية.</p>
`,
		on: () => {},
		out: () => {}
	},
	{
		id: 'how-transformers-work',
		title: 'كيف يعمل الترانسفورمر؟',
		content: `<p>الترانسفورمر ليس سحراً—بل يبني النصوص خطوة بخطوة من خلال طرح سؤال رياضي بسيط متكرر:</p>
	<blockquote class="question">
		"ما هي الكلمة (أو الرمز Token) التالية الأكثر احتمالاً لتتبع هذا النص؟"
	</blockquote>
	<p>هنا نستكشف كيف يولد النموذج المدرب النص. اكتب نصك الخاص أو اختر نموذجاً من القائمة، ثم اضغط على زر <strong>توليد (Generate)</strong> لتشاهده عملياً. إذا لم يكتمل تنزيل النموذج بعد، جرب أحد <strong>الأمثلة (Examples)</strong> الجاهزة.</p>`,
		on: () => {
			highlightElements(['.input-form']);
			if (get(isFetchingModel)) {
				highlightElements(['.input-form .select-button']);
			} else {
				highlightElements(['.input-form .generate-button']);
			}
		},
		out: () => {
			removeHighlightFromElements([
				'.input-form',
				'.input-form .select-button',
				'.input-form .generate-button'
			]);
		},
		complete: () => {
			removeFingerFromElements(['.input-form .select-button', '.input-form .generate-button']);
			if (get(textbookCurrentPageId) === 'how-transformers-work') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'how-transformers-work'
				});
			}
		}
	},
	{
		id: 'transformer-architecture',
		title: 'بنية الترانسفورمر (Transformer Architecture)',
		content:
			'<p>يتكون الترانسفورمر التوليدي من ثلاثة أجزاء رئيسية:</p><div class="numbered-list"><div class="numbered-item"><span class="number-circle">1</span><div class="item-content"><strong>التضمين (Embeddings):</strong> تحويل النصوص والكلمات إلى متجهات أرقام يفهمها الحاسوب.</div></div><div class="numbered-item"><span class="number-circle">2</span><div class="item-content"><strong>كتل الترانسفورمر (Transformer blocks):</strong> دمج المعلومات وسياق الكلمات عبر آلية الانتباه الذاتي (Self-Attention) وصقلها بشبكة (MLP).</div></div><div class="numbered-item"><span class="number-circle">3</span><div class="item-content"><strong>الاحتمالات (Probabilities):</strong> حساب احتمالية كل كلمة أو رمز تالٍ في القاموس لاختيار الكلمة المناسبة.</div></div></div>',
		on: () => {
			const selectors = [
				'.step.embedding',
				'.step.softmax',
				'.transformer-bounding',
				'.transformer-bounding-title'
			];
			highlightElements(selectors);
			applyTransformerBoundingHeight(['.softmax-bounding', '.embedding-bounding']);
		},
		out: () => {
			const selectors = [
				'.step.embedding',
				'.step.softmax',
				'.transformer-bounding',
				'.transformer-bounding-title'
			];
			removeHighlightFromElements(selectors);
			resetElementsHeight(['.softmax-bounding', '.embedding-bounding']);
		}
	},
	{
		id: 'embedding',
		title: 'التضمين (Embedding)',
		content: `<p>قبل أن يتمكن نموذج الـ Transformer من معالجة أي نص، يقوم بتقسيمه أولاً إلى وحدات صغيرة وتمثيل كل وحدة بقائمة من الأرقام تسمى متجهاً (Vector). تسمى هذه العملية <strong>Embedding (التضمين)</strong>، ويطلق المصطلح على كل من العملية والمتجه الناتج معاً.</p><p>في هذه الأداة البصرية، يظهر كل متجه كمستطيل ملون، ويمكنك التمرير فوقه لرؤية أبعاده وقيمه الرياضية.</p>`,
		on: () => {
			highlightElements(['.step.embedding .title']);
		},
		out: () => {
			removeHighlightFromElements(['.step.embedding .title']);
		},
		complete: () => {
			removeFingerFromElements(['.step.embedding .title']);
			if (get(textbookCurrentPageId) === 'embedding') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'embedding'
				});
			}
		}
	},
	{
		id: 'token-embedding',
		title: 'تضمين الرموز (Token Embedding)',
		content: `<p>تبدأ العملية بـ <strong>التقطيع والترميز (Tokenization)</strong> لتقسيم النص المدخل إلى رموز (Tokens)—وهي وحدات صغيرة قد تكون كلمة كاملة أو جزءاً من كلمة. يمتلك قاموس GPT-2 الصغير 50,257 رمزاً فريداً، ولكل منها معرّف رقمي (ID).</p><p>في خطوة <strong>تضمين الرموز (Token Embedding)</strong>، يتم ربط كل رمز بمتجه يحتوي على 768 رقماً من جدول بحث ضخم. يتعلم النموذج هذه المتجهات أثناء التدريب لتمثيل المعنى الدلالي لكل كلمة.</p>`,
		on: function () {
			const selectors = [
				'.token-column .column.token-string',
				'.token-column .column.token-embedding'
			];
			if (get(expandedBlock).id !== 'embedding') {
				expandedBlock.set({ id: 'embedding' });
				this.timeoutId = setTimeout(() => {
					highlightElements(selectors);
				}, 500);
			} else {
				highlightElements(selectors);
			}
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			const selectors = [
				'.token-column .column.token-string',
				'.token-column .column.token-embedding'
			];
			removeHighlightFromElements(selectors);
			if (get(textbookCurrentPageId) !== 'positional-encoding') expandedBlock.set({ id: null });
		}
	},
	{
		id: 'positional-encoding',
		title: 'الترميز الموضعي (Positional Encoding)',
		content: `<p>ترتيب الكلمات أمر جوهري في اللغة لتحديد المعنى. يمنح <strong>الترميز الموضعي (Positional Encoding)</strong> كل رمز معلومات عن موقعه وترتيبه الزمني في الجملة.</p><p>يقوم GPT-2 بذلك عن طريق إضافة متجه موضع تم تعلمه أثناء التدريب إلى متجه الكلمة الأصلي، بينما قد تستخدم النماذج الحديثة طرقاً أخرى مثل RoPE (الترميز الدوار). والهدف هو تمكين النموذج من التمييز بين معاني الجمل بحسب ترتيب الكلمات.</p>`,
		on: function () {
			const selectors = [
				'.token-column .column.position-embedding',
				'.token-column .column.symbol'
			];
			if (get(expandedBlock).id !== 'embedding') {
				expandedBlock.set({ id: 'embedding' });
				this.timeoutId = setTimeout(() => {
					highlightElements(selectors);
				}, 500);
			} else {
				highlightElements(selectors);
			}
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			const selectors = [
				'.token-column .column.position-embedding',
				'.token-column .column.symbol'
			];
			removeHighlightFromElements(selectors);
			if (get(textbookCurrentPageId) !== 'token-embedding') expandedBlock.set({ id: null });
		}
	},
	{
		id: 'blocks',
		title: 'كتل الترانسفورمر المتكررة (Transformer Blocks)',
		content: `<p>تُعد <strong>كتلة الترانسفورمر (Transformer block)</strong> وحدة المعالجة المركزية المتكررة في النموذج، وتتكون من جزأين رئيسيين:</p><ul><li><strong>الانتباه الذاتي متعدد الرؤوس (Multi-head self-attention):</strong> يتيح للكلمات تبادل المعلومات والسياق فيما بينها.</li><li><strong>شبكة MLP (التغذية الأمامية):</strong> تصقل وتعمق تفاصيل كل رمز على حدة.</li></ul><p>تتراصف عدة كتل متتالية فوق بعضها لتتعمق وتتطور تمثيلات الكلمات تدريجياً. يحتوي نموذج GPT-2 الصغير على 12 كتلة متتالية.</p>`,
		on: function () {
			this.timeoutId = setTimeout(
				() => {
					highlightElements([
						'.transformer-bounding',
						'.step.transformer-blocks .guide',
						'.attention > .title',
						'.mlp > .title'
					]);
					highlightElements(['.transformer-bounding-title'], 'textbook-button-highlight');
					isBoundingBoxActive.set(true);
				},
				get(isExpandOrCollapseRunning) ? 500 : 0
			);
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements([
				'.transformer-bounding',
				'.step.transformer-blocks .guide',
				'.attention > .title',
				'.mlp > .title'
			]);
			removeHighlightFromElements(['.transformer-bounding-title'], 'textbook-button-highlight');
			isBoundingBoxActive.set(false);
		},
		complete: () => {
			removeFingerFromElements(['.transformer-bounding-title']);
			if (get(textbookCurrentPageId) === 'blocks') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'blocks'
				});
			}
		}
	},
	{
		id: 'self-attention',
		title: 'الانتباه الذاتي متعدد الرؤوس (Multi-Head Self Attention)',
		content:
			'<p>تسمح آلية <strong>الانتباه الذاتي (Self-attention)</strong> للنموذج بتحديد أي الكلمات في النص المدخل هي الأكثر صلة وأهمية لكل رمز. يساعد هذا النموذج على فهم المعنى والسياق المتبادل حتى بين الكلمات المتباعدة في الجملة.</p><p>في بنية <strong>الرؤوس المتعددة (Multi-head)</strong>، ينفذ النموذج عمليات انتباه متعددة بالتوازي، بحيث يركز كل "رأس" على نمط لغوي مختلف (مثل النحو، الضمائر، أو العلاقات الدلالية).</p>',
		on: () => {
			highlightElements(['.step.attention']);
		},
		out: () => {
			removeHighlightFromElements(['.step.attention']);
		}
	},
	{
		id: 'qkv',
		title: 'الاستعلام، المفتاح، القيمة (Query, Key, Value)',
		content: `
	<p>لحساب الانتباه الذاتي، يتحول متجه كل رمز إلى 
  <span class="highlight">ثلاثة متجهات جديدة</span>—
  <span class="blue">الاستعلام (Query - Q)</span>، و 
  <span class="red">المفتاح (Key - K)</span>، و 
  <span class="green">القيمة (Value - V)</span>.
  يتم هذا التحويل عبر ضرب متجه الرمز بمصفوفات أوزان وانحيازات (Weights and Biases) خاصة تم تحسينها أثناء التدريب.</p>

<p>بعد إنشائها، يقارن متجه <span class="blue">الاستعلام (Query)</span> مع متجهات <span class="red">المفاتيح (Keys)</span> لقياس درجة الصلة، ثم تُستخدم هذه النتيجة كأوزان لترجيح <span class="green">القيم (Values)</span>.</p>
`,
		on: function () {
			this.timeoutId = setTimeout(
				() => {
					highlightElements(['g.path-group.qkv', '.step.qkv .qkv-column']);
				},
				get(isExpandOrCollapseRunning) ? 500 : 0
			);
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements(['g.path-group.qkv', '.step.qkv .qkv-column']);
			weightPopover.set(null);
		},
		complete: () => {
			removeFingerFromElements(['.step.qkv .qkv-column']);
			if (get(textbookCurrentPageId) === 'qkv') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'qkv'
				});
			}
		}
	},

	{
		id: 'multi-head',
		title: 'الرؤوس المتعددة (Multi-head)',
		content:
			'<p>بعد إنشاء متجهات <span class="blue">Q (الاستعلام)</span> و <span class="red">K (المفتاح)</span> و <span class="green">V (القيمة)</span>، يجزئها النموذج إلى عدة <strong>رؤوس (Heads)</strong> (12 رأساً في GPT-2 الصغير). يعمل كل رأس على جزء أصغر ومستقل من المتجهات، ليركز على نمط محدد في النص—مثل التراكيب النحوية أو المعاني الدلالية أو الروابط بعيدة المدى.</p><p>تسمح الرؤوس المتعددة للنموذج بتعلم أنواع متنوعة من العلاقات في نفس الوقت وبشكل متوازٍ، مما يثري فهمه للغة.</p>',
		on: () => {
			highlightAttentionPath();
			highlightElements(['.multi-head .head-title']);
		},
		out: () => {
			removeAttentionPathHighlight();
			removeHighlightFromElements(['.multi-head .head-title']);
		},
		complete: () => {
			removeFingerFromElements(['.multi-head .head-title']);
			if (get(textbookCurrentPageId) === 'multi-head') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'multi-head'
				});
			}
		}
	},
	{
		id: 'masked-self-attention',
		title: 'الانتباه الذاتي المقنّع (Masked Self Attention)',
		content: `<p>داخل كل رأس انتباه، يحدد النموذج مقدار تركيز كل كلمة على غيرها عبر 3 خطوات رياضية:</p><ul><li><strong>الضرب النقطي (Dot Product):</strong> ضرب قيم <span class="blue">Query (الاستعلام)</span> في <span class="red">Key (المفتاح)</span> لإنتاج <span class="purple">درجات الانتباه (Attention scores)</span>.</li><li><strong>القناع (Masking):</strong> حجب الكلمات اللاحقة (المستقبلية) لكي لا "يغش" النموذج أثناء التنبؤ بالكلمة التالية.</li><li><strong>دالة سوفت ماكس (Softmax):</strong> تحويل الدرجات إلى احتمالات مجموع كل صف فيها يساوي 1، لتعكس نسبة الاهتمام بكل كلمة سابقة.</li></ul>`,
		on: () => {
			highlightAttentionPath();
			highlightElements(['.attention-matrix.attention-result']);
		},
		out: () => {
			removeAttentionPathHighlight();
			removeHighlightFromElements(['.attention-matrix.attention-result']);
			expandedBlock.set({ id: null });
		},
		complete: () => {
			removeFingerFromElements(['.attention-matrix.attention-result']);
			if (get(textbookCurrentPageId) === 'masked-self-attention') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'masked-self-attention'
				});
			}
		}
	},
	{
		id: 'output-concatenation',
		title: 'مخرج الانتباه والدمج (Attention Output & Concatenation)',
		content:
			'<p>يقوم كل رأس انتباه <span class="highlight">بضرب درجات <span class="purple">الانتباه (Attention scores)</span> في متجهات <span class="green">القيمة (Value)</span> لإنتاج مخرجه</span>—وهو تمثيل دقيق ومصقول لكل رمز بعد أخذ السياق المحيط في الحسبان.</p><p>في GPT-2 توجد 12 مخرجاً (واحد لكل رأس)، ويتم دمجها جنباً إلى جنب (Concatenation) ثم تمريرها عبر طبقة خطية لتعود إلى الحجم الأصلي (768 رقماً).</p>',
		on: function () {
			this.timeoutId = setTimeout(
				() => {
					highlightElements(['path.to-attention-out.value-to-out', '.attention .column.out']);
				},
				get(isExpandOrCollapseRunning) ? 500 : 0
			);
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements(['path.to-attention-out.value-to-out', '.attention .column.out']);
			weightPopover.set(null);
		},
		complete: () => {
			removeFingerFromElements(['.attention .column.out']);
			if (get(textbookCurrentPageId) === 'output-concatenation') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'output-concatenation'
				});
			}
		}
	},
	{
		id: 'mlp',
		title: 'شبكة MLP (المُدرك متعدد الطبقات)',
		content:
			'<p>يمر مخرج الانتباه بعد ذلك عبر طبقة <strong>MLP (Multilayer Perceptron)</strong> لتنقيح تمثيلات الرموز. تغيّر الطبقة الخطية أبعاد وقيم التضمين، ثم تحدد دالة التنشيط غير الخطية (Non-linear activation) كمية المعلومات التي تمر.</p><p>يستخدم GPT-2 دالة تنشيط تسمى <strong>GELU</strong>، والتي تسمح للقيم الصغيرة بالمرور جزئياً وللقيم الكبيرة بالمرور كلياً، مما يساعد على التقاط الأنماط الدقيقة والقوية في البيانات.</p>',
		on: () => {
			highlightElements(['.step.mlp', '.operation-col.activation']);
		},
		out: () => {
			removeHighlightFromElements(['.step.mlp', '.operation-col.activation']);
		}
	},

	{
		id: 'output-logit',
		title: 'لوجيتس المخرجات (Output Logits)',
		content: `<p>بعد اجتياز جميع كتل الترانسفورمر، يتم أخذ متجه المخرج للرمز الأخير—والذي أصبح مشبعاً بسياق جميع الكلمات السابقة—ويُضرب في أوزان الطبقة الخطية الأخيرة.</p><p>ينتج عن ذلك متجهات <strong>Logits (اللوجيتس)</strong>، وهي 50,257 رقماً (رقم لكل رمز في قاموس GPT-2) تمثل الدرجة الخام لاحتمالية أن يكون هذا الرمز هو الكلمة التالية.</p>`,
		on: () => {
			highlightElements(['g.path-group.softmax', '.column.final']);
		},
		out: () => {
			removeHighlightFromElements(['g.path-group.softmax', '.column.final']);
			weightPopover.set(null);
		},
		complete: () => {
			removeFingerFromElements(['.column.final']);
			if (get(textbookCurrentPageId) === 'output-logit') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'output-logit'
				});
			}
		}
	},
	{
		id: 'output-probabilities',
		title: 'الاحتمالات (Output Probabilities)',
		content:
			'<p>الـ Logits هي مجرد درجات خام غير مقيدة. لكي نتمكن من تفسيرها، نحولها عبر دالة Softmax إلى <strong>احتمالات (Probabilities)</strong> بين 0 و 1 ومجموعها جميعاً يساوي 1، لتوضح أرجحية كل كلمة تالية.</p><p>وبدلاً من اختيار الكلمة الأعلى احتمالاً دائماً (Greedy search)، نستخدم استراتيجيات اختيار متنوعة لتحقيق التوازن بين الدقة والابتكار في النص المولد.</p>',
		on: () => {
			highlightElements(['.step.softmax .title']);
		},
		out: () => {
			removeHighlightFromElements(['.step.softmax .title']);
		},
		complete: () => {
			removeFingerFromElements(['.step.softmax .title']);
			if (get(textbookCurrentPageId) === 'output-probabilities') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'output-probabilities'
				});
			}
		}
	},
	{
		id: 'temperature',
		title: 'درجة الحرارة (Temperature)',
		content:
			'<p>تعمل <strong>Temperature (درجة الحرارة)</strong> على ضبط درجات اللوجيتس قبل تحويلها إلى احتمالات. تُعد <strong>الحرارة المنخفضة</strong> (مثل 0.2) النموذج أكثر ثقة وثباتاً بتركيز الاحتمال على الخيارات المتصدرة، مما يعطي <strong>إجابات محددة وقابلة للتنبؤ</strong>. بينما تؤدي <strong>الحرارة المرتفعة</strong> (مثل 1.0 فأعلى) إلى تسطيح الفروقات، مما يتيح كلمات غير متوقعة ويزيد من <strong>"إبداعية" وتنوع النص</strong>.</p>',
		on: function () {
			if (get(expandedBlock).id !== 'softmax') {
				expandedBlock.set({ id: 'softmax' });
				this.timeoutId = setTimeout(() => {
					highlightElements([
						'.formula-step.scaled',
						'.title-box.scaled',
						'.content-box.scaled',
						'.temperature-input'
					]);
				}, 500);
			} else {
				highlightElements([
					'.formula-step.scaled',
					'.title-box.scaled',
					'.content-box.scaled',
					'.temperature-input'
				]);
			}
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements([
				'.formula-step.scaled',
				'.title-box.scaled',
				'.temperature-input',
				'.content-box.scaled'
			]);
			if (!['temperature', 'sampling'].includes(get(textbookCurrentPageId)))
				expandedBlock.set({ id: null });
		},
		complete: () => {
			removeFingerFromElements(['.temperature-input']);
			if (get(textbookCurrentPageId) === 'temperature') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'temperature'
				});
			}
		}
	},
	{
		id: 'sampling',
		title: 'استراتيجية أخذ العينات (Sampling Strategy)',
		content:
			'<p>في النهاية، نحتاج لاستراتيجية لاختيار الرمز التالي: يقتصر <strong>Top-k</strong> على إبقاء أفضل k كلمات ذات أعلى احتمالية واستبعاد البقية، بينما يجمع <strong>Top-p</strong> أصغر مجموعة من الكلمات التي يحقق مجموع احتمالاتها النسبة p.</p><p>ثم تحول دالة Softmax القيم المتبقية إلى توزيع احتمالي، ويتم اختيار رمز واحد عشوائياً بناءً على هذا التوزيع.</p>',
		on: function () {
			if (get(expandedBlock).id !== 'softmax') {
				expandedBlock.set({ id: 'softmax' });
				this.timeoutId = setTimeout(() => {
					highlightElements([
						'.formula-step.sampling',
						'.title-box.sampling',
						'.sampling-input',
						'.content-box.sampling'
					]);
				}, 500);
			} else {
				highlightElements([
					'.formula-step.sampling',
					'.title-box.sampling',
					'.sampling-input',
					'.content-box.sampling'
				]);
			}
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements([
				'.formula-step.sampling',
				'.title-box.sampling',
				'.sampling-input',
				'.content-box.sampling'
			]);
			if (!['temperature', 'sampling'].includes(get(textbookCurrentPageId)))
				expandedBlock.set({ id: null });
		},
		complete: () => {
			removeFingerFromElements(['.sampling-input']);
			if (get(textbookCurrentPageId) === 'sampling') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'sampling'
				});
			}
		}
	},
	{
		id: 'residual',
		title: 'وصلة التخطي المتبقية (Residual Connection)',
		content: `<p>يحتوي الترانسفورمر على ميزات معمارية مساعدة تعزز الأداء؛ مثل <strong>الوصلة المتبقية (Residual connection)</strong> التي تجمع مدخلات الطبقة مباشرة مع مخرجاتها، مما يحمي المعلومات والتدرجات من التلاشي أثناء مرورها عبر عشرات الطبقات. تُستخدم مرتين داخل كل كتلة في GPT-2.</p>`,
		on: function () {
			this.timeoutId = setTimeout(
				() => {
					highlightElements(['.operation-col.residual', '.residual-start']);
					drawLine();
				},
				get(isExpandOrCollapseRunning) ? 500 : 0
			);
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements(['.operation-col.residual', '.residual-start']);
			removeLine();
		}
	},
	{
		id: 'layer-normalization',
		title: 'تطبيع الطبقات (Layer Normalization)',
		content: `<p>يعمل <strong>تطبيع الطبقات (Layer Normalization)</strong> على استقرار عملية التدريب والتوليد من خلال تعديل القيم لتظل ذات متوسط وتباين ثابتين. هذا يجعل النموذج أقل حساسية للأوزان الأولية وأسرع في التعلم. يُطبق مرتين داخل كل كتلة ومرة أخيرة قبل المخرجات.</p>`,
		on: () => {
			highlightElements(['.operation-col.ln']);
		},
		out: () => {
			removeHighlightFromElements(['.operation-col.ln']);
		}
	},
	{
		id: 'dropout',
		title: 'الإسقاط العشوائي (Dropout)',
		content: `<p>أثناء التدريب، يقوم <strong>الإسقاط العشوائي (Dropout)</strong> بإيقاف نسبة من الاتصالات العصبية عشوائياً لمنع الحفظ الأعمى (Overfitting)، مما يجبر النموذج على تعلم سمات قوية تعمم بشكل أفضل على البيانات الجديدة. وفي مرحلة التوليد الفعلي (Inference)، يتم إيقاف الإسقاط وتعمل كافة الاتصالات.</p>`,
		on: () => {
			highlightElements(['.operation-col.dropout']);
		},
		out: () => {
			removeHighlightFromElements(['.operation-col.dropout']);
		}
	}
];
