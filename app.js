const headElem = document.getElementById('head');
const buttonsElem = document.getElementById('buttons');
const pagesElem = document.getElementById('pages');

// Class representing the test
class Quiz {
	constructor(type, questions, results) {
		// Test types: 1 - classic, with right answers; 2 - without right answers
		this.type = type;

		// Questions array
		this.questions = questions;

		// Possible results array
		this.results = results;

		// Score
		this.score = 0;

		// Result number from array
		this.result = 0;

		// Current question number
		this.current = 0;
	}
	Click(index) {
		// Adding score
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		// If atleast 1 score was added - answer is correct
		if (value >= 1) {
			correct = index;
		} else {
			// Otherwise looking for the right one
			for (i = 0; i < this.questions[this.current].answers.length; i++) {
				if (this.questions[this.current].answers[i].value >= 1) {
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	// To the next question
	Next() {
		this.current++;

		if (this.current >= this.questions.length) {
			this.End();
		}
	}

	// If we're out of questions this method check user's result
	End() {
		for (i = 0; i < this.results.length; i++) {
			if (this.results[i].Check(this.score)) {
				this.result = i;
			}
		}
	}
}

// Class representing the question
class Question {
	constructor(text, answers) {
		this.text = text;
		this.answers = answers;
	}

	Click(index) {
		return this.answers[index].value;
	}
}

// Class representing the answer
class Answer {
	constructor(text, value) {
		this.text = text;
		this.value = value;
	}
}

// Class representing the result
class Result {
	constructor(text, value) {
		this.text = text;
		this.value = value;
	}

	// This method check if user's score is enough
	Check(value) {
		if (this.value <= value) {
			return true;
		} else {
			return false;
		}
	}
}

const results = [
	new Result('Результат - 0: Анскилл ебаный', 0),
	new Result('Результат - 10: Жалкое зрелище', 10),
	new Result('Результат - 20: Постарайся хотя бы', 20),
	new Result('Результат - 40: Нихуево, так-то', 40),
	new Result('Результат - 60: Нат бэд, нат бэд', 60),
	new Result('Результат - 75: Красава', 75),
	new Result('Результат - 86: Максималочка. Харош', 86),
];

// Questions array
const questions = [
	new Question('Пиксель является - ', [
		new Answer('Основой векторной графики', 0),
		new Answer('Основой растровой графики', 1),
		new Answer('Основой фрактальной графики', 0),
		new Answer('Основой трёхмерной графики', 0),
	]),
	new Question('При изменении размеров растрового изображения - ', [
		new Answer('качество остаётся неизменным', 0),
		new Answer('качество ухудшается при увеличении и уменьшении', 1),
		new Answer(
			'при уменьшении остаётся неизменным, а при увеличении ухудшается',
			0
		),
		new Answer(
			'. при уменьшении ухудшается, а при увеличении остаётся неизменным',
			0
		),
	]),
	new Question('Что можно отнести к устройствам ввода информации?', [
		new Answer('мышь, клавиатура, экраны', 0),
		new Answer('клавиатура, принтер, колонки', 0),
		new Answer('сканер, клавиатура, мышь ', 1),
		new Answer('колонки, сканер, клавиатура', 0),
	]),
	new Question('Какие цвета входят в цветовую модель RGB?', [
		new Answer('чёрный, синий, красный', 0),
		new Answer('жёлтый, розовый, голубой', 0),
		new Answer('розовый, голубой, белый', 0),
		new Answer('красный, зеленый, голубой ', 1),
	]),
	new Question('Что такое интерполяция?', [
		new Answer('программа для работу в с фрактальными редакторами', 0),
		new Answer('инструмент в Photoshop', 0),
		new Answer(
			'разлохмачивание краёв при изменении размеров растрового изображения ',
			1
		),
		new Answer('это слово не как не связано с компьютерной графикой', 0),
	]),
	new Question(
		'Наименьшим элементом изображения на графическом экране монитора является?',
		[
			new Answer('пиксель', 1),
			new Answer('курсор', 0),
			new Answer('символ', 0),
			new Answer('линия', 0),
		]
	),
	new Question('Выберете устройства являющееся устройством вывода', [
		new Answer('сканер', 0),
		new Answer('принтер, дисплей монитора', 1),
		new Answer('мышь', 0),
		new Answer('клавиатура', 0),
	]),
	new Question(
		'Какие программы предназначены для работы с векторной графикой?',
		[
			new Answer('Paint', 0),
			new Answer('Corel Draw ', 1),
			new Answer('Photoshop', 0),
			new Answer('Blender', 0),
		]
	),
	new Question('При изменении размеров векторной графики его качество: ', [
		new Answer(
			'при уменьшении ухудшается, а при увеличении остаётся неизменным',
			0
		),
		new Answer(
			'при уменьшении остаётся неизменным а при увеличении ухудшается',
			0
		),
		new Answer('качество остаётся неизменным', 1),
		new Answer('качество ухудшается при увеличении и уменьшении', 0),
	]),
	new Question('Чем больше разрешение, тем …. изображение', [
		new Answer('светлее', 0),
		new Answer('темнее', 0),
		new Answer('не меняется', 0),
		new Answer('качественнее', 1),
	]),
	new Question('Пиксилизация эффект ступенек это один из недостатков', [
		new Answer('векторной графики', 0),
		new Answer('фрактальной графики', 0),
		new Answer('растровой графики', 1),
		new Answer('масленой графики', 0),
	]),
	new Question(
		'Сетка из горизонтальных и вертикальных столбцов, которую на экране образуют пиксели, называется: ',
		[
			new Answer('растр', 1),
			new Answer('видеопамять', 0),
			new Answer('видеоадаптер', 0),
			new Answer('дисплейный процессор', 0),
		]
	),
	new Question(
		'Способ хранения информации в файле, а также форму хранения определяет',
		[
			new Answer('пиксель', 0),
			new Answer('формат', 1),
			new Answer('графика', 0),
			new Answer('гифка', 0),
		]
	),
	new Question('С помощью растрового редактора можно:', [
		new Answer('выполнять расчёт', 0),
		new Answer('создать коллаж', 1),
		new Answer('набрать текст', 0),
		new Answer('печатать текст', 0),
	]),
	new Question('Для ввода изображения в компьютер используются:', [
		new Answer('принтер', 0),
		new Answer('диктофон', 0),
		new Answer('сканер', 1),
		new Answer('цифровой микрофон', 0),
	]),
	new Question('Графический редактор - это ', [
		new Answer('устройство для создания и редактирования рисунков', 0),
		new Answer('устройство для печати рисунков на бумаге', 0),
		new Answer(
			'программа для создания и редактирования текстовых документов',
			0
		),
		new Answer('программа для создания и редактирования рисунков', 1),
	]),
	new Question('Графическим объектом НЕ является', [
		new Answer('чертёж', 0),
		new Answer('рисунок', 0),
		new Answer('текст письма', 1),
		new Answer('схема', 0),
	]),
	new Question('Растровым графическим редактором НЕ является', [
		new Answer('Corel draw', 1),
		new Answer('GIMP', 0),
		new Answer('Paint', 0),
		new Answer('Photoshop', 0),
	]),
	new Question('Выберете устройства являющееся устройством вывода', [
		new Answer('сканер', 0),
		new Answer('принтер, дисплей монитора', 1),
		new Answer('мышь', 0),
		new Answer('клавиатура', 0),
	]),
	new Question(
		'В процессе сжатия растровых графических изображений по алгоритму JPEG его информационный объем обычно уменьшается в …',
		[
			new Answer('100 раз', 0),
			new Answer('10-15 раз', 1),
			new Answer('ни разу', 0),
			new Answer('2-3 раза', 0),
		]
	),
	new Question('В модели СМУК используется', [
		new Answer('красный, голубой, желтый, синий', 0),
		new Answer('голубой, пурпурный, желтый, белый', 0),
		new Answer('голубой, пурпурный, желтый, черный', 1),
		new Answer('красный, зеленый, синий, черный', 0),
	]),
	new Question(
		'В цветовой модели RGB установлены следующие параметры: 0, 255, 0. Какой цвет будет соответствовать этим параметрам?',
		[
			new Answer('чёрный', 0),
			new Answer('голубой', 0),
			new Answer('красный', 0),
			new Answer('зелёный', 1),
		]
	),
	new Question('«Узлами» кривой Безье являются две точки, которые:', [
		new Answer('объединяет точки в отрезок', 0),
		new Answer('группирует объекты', 0),
		new Answer(
			'«связывают» элементарные кривые друг с другом, чтобы образовать единый, сложный контур',
			1
		),
		new Answer('нет верного ответа', 0),
	]),
	new Question(
		'Визуальное и цифровое представление цвета в зависимости от требований практики называется:',
		[
			new Answer('цветовой моделью', 1),
			new Answer('цветовой схемой', 0),
			new Answer('цветовой образец', 0),
			new Answer('нет верного ответа ', 0),
		]
	),
	new Question(
		'Генерация повторяющихся изображений, создающая иллюзию движений, — ...',
		[
			new Answer('мультик', 0),
			new Answer('анимация', 1),
			new Answer('стереоанимация', 0),
			new Answer('одушевление', 0),
		]
	),
	new Question(
		'Плоттеры, в которых при формировании изображения используется направленное распыление капель чернил, называются:',
		[
			new Answer('матричными', 0),
			new Answer('струйными', 1),
			new Answer('лазерными', 0),
			new Answer('нет правильного ответа', 0),
		]
	),
	new Question('Принцип точечной графики — это:', [
		new Answer('изображение объекта в виде векторных кривых ', 0),
		new Answer('изображение объекта из сплайнов', 0),
		new Answer('изображение объекта в виде совокупности цветных точек', 1),
		new Answer('нет верного ответа', 0),
	]),
	new Question('Цветовой охват — это:', [
		new Answer('диапазон из 3 цветов', 0),
		new Answer('диапазон из 12 цветов', 0),
		new Answer('нет правильного ответа', 0),
		new Answer(
			'возможный диапазон цветов, доступный техническому устройству или глазу',
			1
		),
	]),
	new Question(
		'Воспроизвести все многообразие видимых глазом цветов при помощи сочетания трех базовых цветов',
		[
			new Answer('частично возможно', 0),
			new Answer('возможно', 0),
			new Answer('принципиально невозможно', 1),
			new Answer('нет правильного ответа', 0),
		]
	),
	new Question('Первичными аддитивными называют цвета', [
		new Answer('красный, зеленый и синий', 1),
		new Answer('красный, желтый, пурпурный, черный', 0),
		new Answer('жёлтый, синий, пурпурный', 0),
		new Answer('нет правильного ответа', 0),
	]),
	new Question('Выберете устройства являющееся устройством вывода', [
		new Answer('сканер', 0),
		new Answer('принтер, дисплей монитора', 1),
		new Answer('мышь', 0),
		new Answer('клавиатура', 0),
	]),
	new Question(
		'Узкоспециализированные профессиональные системы, предназначенные для проведения различных дизайнерских и проектировочных работ, называются:',
		[
			new Answer('информационными станциями', 0),
			new Answer('графическими станциями', 1),
			new Answer('графическим компьютером', 0),
			new Answer('нет верного ответа ', 0),
		]
	),
	new Question('Объем видеопамяти адаптера SVGA', [
		new Answer('более 255 Гбайт', 0),
		new Answer('нет верного ответа ', 0),
		new Answer('более 1 Мбайт', 1),
		new Answer('менее 1 Мбайт', 0),
	]),
	new Question('Мышь — это устройство ...', [
		new Answer('ввода и вывода информации', 0),
		new Answer('нет правильного ответа', 0),
		new Answer('вывода информации', 0),
		new Answer('ввода информации', 1),
	]),
	new Question('Векторная графика мало пригодна', [
		new Answer('3d изображений', 0),
		new Answer('gif изображений', 0),
		new Answer('для создания фотореалистических изображений', 1),
		new Answer('нет правильного ответа', 0),
	]),
	new Question('Контур, которому присвоены какие-либо параметры, — это:', [
		new Answer('обводка', 1),
		new Answer('линия', 0),
		new Answer('кривая Безье', 0),
		new Answer('сплайн', 0),
	]),
	new Question(
		'Цветовая модель, использующая цвета: голубой, пурпурный, желтый, — это:',
		[
			new Answer('Lab', 0),
			new Answer('CMY', 1),
			new Answer('RGB', 0),
			new Answer('нет правильного ответа', 0),
		]
	),
	new Question('Под термином «Кривая Безье» подразумевается:', [
		new Answer('полилиния', 0),
		new Answer(
			'кривая, применяющаяся для описания изображений в векторной графике',
			1
		),
		new Answer('кривая, которая соединяет две точки', 0),
		new Answer('сплайн', 0),
	]),
	new Question('В векторной графике широко используется:', [
		new Answer('сплайн', 0),
		new Answer('отрезок', 0),
		new Answer('кривая Безье', 1),
		new Answer('нет правильного ответа', 0),
	]),
	new Question('Под термином «Кривая Безье» подразумевается:', [
		new Answer(
			'кривая, применяющаяся для описания изображений в растровой графике',
			0
		),
		new Answer('ломаная кривая ', 0),
		new Answer('нет верного ответа', 0),
		new Answer(
			'кривая, применяющаяся для описания изображений в векторной графике',
			1
		),
	]),
	new Question(
		'Процесс разложения цветного изображения на четыре составляющие стандартного печатного процесса называется:',
		[
			new Answer('цветоопределение', 0),
			new Answer('цветовосприятие', 0),
			new Answer('цветоделением', 1),
			new Answer('цветопроба', 0),
		]
	),
	new Question('Характеристикой цвета, определяющей его чистоту, является:', [
		new Answer('насыщенность', 1),
		new Answer('цветовой тон', 0),
		new Answer('яркость', 0),
		new Answer('светлота', 0),
	]),
	new Question('Плоттер предназначен для:', [
		new Answer('ввода векторных изображений', 0),
		new Answer('вывода рисунков и чертежей', 1),
		new Answer('ввода информации', 0),
		new Answer('вывод только растровых изображений', 0),
	]),
	new Question('Формат JPEG использует разрядов (бит):', [
		new Answer('42', 0),
		new Answer('24', 1),
		new Answer('8', 0),
		new Answer('255', 0),
	]),
	new Question(
		'Цветовая модель, основанная на трех цветах: красном, зеленом, синем, — ...',
		[
			new Answer('CMYK', 0),
			new Answer('CMY', 0),
			new Answer('RGB', 1),
			new Answer('LAB', 0),
		]
	),
	new Question(
		'Графическим редактором называется программа, предназначенная для:',
		[
			new Answer('создания графического образа текста', 0),
			new Answer('редактирования вида и начертания шрифта', 0),
			new Answer('построения диаграмм', 0),
			new Answer('работы с графическим изображением', 1),
		]
	),
	new Question(
		'Минимальным объектом, используемым в векторном графическом редакторе, является:',
		[
			new Answer('объект (прямоугольник, круг и т. д.);', 0),
			new Answer('палитра цветов', 0),
			new Answer('точка экрана (пиксел)', 1),
			new Answer('знакоместо (символ)', 0),
		]
	),
	new Question(
		'К основным операциям, возможным в графическом редакторе, относятся:',
		[
			new Answer('выделение, копирование, вставка', 1),
			new Answer('линия, круг, прямоугольник', 0),
			new Answer('карандаш, кисть, ластик', 0),
			new Answer('набор цветов', 0),
		]
	),
	new Question(
		'В цветовой модели RGB установлены следующие параметры: 0, 255, 0. Какой цвет будет соответствовать этим параметрам?',
		[
			new Answer('черный', 0),
			new Answer('зеленый', 1),
			new Answer('красный', 0),
			new Answer('синий', 0),
		]
	),
	new Question('Большой размер файла — один из недостатков: ', [
		new Answer('векторной графики', 0),
		new Answer('растровой графики', 1),
		new Answer('инженерной графики', 0),
		new Answer('промышленной графики', 0),
	]),
	new Question('Разрешение изображения измеряется в:', [
		new Answer('точках на дюйм (dpi)', 0),
		new Answer('мм, см, дюймах', 0),
		new Answer('пикселах', 1),
		new Answer('количестве цветовых оттенков на дюйм (jpeg)', 0),
	]),
	new Question('Какая заливка называется градиентной?', [
		new Answer('сплошная (одним цветом)', 0),
		new Answer('заливка с использованием внешней текстуры', 0),
		new Answer('заливка узором', 0),
		new Answer('с переходом (от одного цвета к другому)', 1),
	]),
	new Question(
		'Для вывода графической информации в персональном компьютере используется',
		[
			new Answer('мышь', 0),
			new Answer('клавиатура', 0),
			new Answer('экран дисплея', 1),
			new Answer('сканер', 0),
		]
	),
	new Question(
		'Графика с представлением изображения в виде последовательности точек со своими координатами, соединенных между собой кривыми, которые описываются математическими уравнениями, называется',
		[
			new Answer('растровой', 1),
			new Answer('фрактальной', 0),
			new Answer('векторной', 0),
			new Answer('прямолинейной', 0),
		]
	),
	new Question(
		'Какие операции мы можем выполнять над векторными графическими изображениями?',
		[
			new Answer('Копировать', 1),
			new Answer('Вырезать', 1),
			new Answer('Вставить', 1),
			new Answer('Переместить', 1),
		]
	),
	new Question(
		'Если требуется создать копию файла, или сохранить его в другой папке или другом формате используется команда',
		[
			new Answer('File – Save (Файл - Сохранить)', 0),
			new Answer('File – Save As (Файл - Сохранить как)', 1),
			new Answer('Файл - Сохранить как шаблон', 0),
			new Answer('нет верного ответа', 0),
		]
	),
	new Question('Если при построении прямоугольника удерживать клавишу Shift', [
		new Answer('Прямоугольник строится с правого верхнего маркера', 0),
		new Answer('строится квадрат', 0),
		new Answer('Прямоугольник строится из середины', 1),
		new Answer('нет верного ответа', 0),
	]),
	new Question('Чтобы отрыть цветовые палитры выполнить', [
		new Answer('Инструменты – Управление цветом', 0),
		new Answer('нет верного ответа', 0),
		new Answer('Окно - Окна настройки', 0),
		new Answer('Окно – Цветовые палитры ', 1),
	]),
	new Question(
		'Какой инструмент выполняет следующие функции? Используется для выполнения любого типа заливки (равномерной, градиентной, шаблоном, текстурой или узором) внутренней области векторного объекта',
		[
			new Answer('кисть', 0),
			new Answer('интеллектуальная заливка', 0),
			new Answer('интерактивная заливка', 1),
			new Answer('заливка', 0),
		]
	),
	new Question(
		'Какой инструмент выполняет следующие функции? Создаёт в векторном объекте эффект тени от объекта',
		[
			new Answer('тень', 1),
			new Answer('контур', 0),
			new Answer('выдавливание', 0),
			new Answer('перетекание ', 0),
		]
	),
	new Question(
		'Минимальным объектом, используемым в растровом графическом редакторе, является: ',
		[
			new Answer('объект (прямоугольник, круг и т. д.)', 0),
			new Answer('точка экрана (пиксел)', 1),
			new Answer('палитра цветов', 0),
			new Answer('знакоместо (символ)', 0),
		]
	),
	new Question(
		'Деформация изображения при изменении размера рисунка — один из недостатков:',
		[
			new Answer('векторной графики', 0),
			new Answer('растровой графики', 1),
			new Answer('инженерной графики', 0),
			new Answer('промышленная графика', 0),
		]
	),
	new Question('Палитрой в графическом редакторе является:', [
		new Answer('линия, круг, прямоугольник', 0),
		new Answer('карандаш, кисть, ластик', 0),
		new Answer('набор цветов', 1),
		new Answer('выделение, копирование, вставка', 0),
	]),
	new Question('Инструментами в графическом редакторе являются:', [
		new Answer('точка экрана (пиксел)', 0),
		new Answer('палитра цветов', 0),
		new Answer('нет правильного ответа', 0),
		new Answer('объект (прямоугольник, круг и т. д.)', 1),
	]),
	new Question(
		'В цветовой модели RGB установлены следующие параметры: 255, О, О. Какой цвет будет соответствовать этим параметрам?',
		[
			new Answer('черный', 0),
			new Answer('зеленый', 0),
			new Answer('красный', 1),
			new Answer('синий', 0),
		]
	),
	new Question(
		'При увеличении разрешения (количества пикселов на дюйм) и размера рисунка размер файла этого рисунка: ',
		[
			new Answer('возрастает', 1),
			new Answer('уменьшается', 0),
			new Answer('остается неизменным', 0),
			new Answer('теряет качество', 0),
		]
	),
	new Question(
		'Минимальной единицей измерения на экране графического редактора является: ',
		[
			new Answer('мм', 0),
			new Answer('пиксел', 1),
			new Answer('см', 0),
			new Answer('дюйм', 0),
		]
	),
	new Question(
		'Для хранения 256-цветного изображения на один пиксель требуется:',
		[
			new Answer('4 бита', 0),
			new Answer('2 байта', 1),
			new Answer('256 битов', 0),
			new Answer('1 байт ', 0),
		]
	),
	new Question(
		'Если элементов графического изображения много и нам нужно их все переместить, нам на помощь приходит',
		[
			new Answer('объединение', 0),
			new Answer('слияние ', 0),
			new Answer('группировка', 1),
			new Answer('упрощение', 0),
		]
	),
	new Question(
		'Какой инструмент выполняет следующие функции? Выполняет рисование произвольной линии. ',
		[
			new Answer('сплайн', 0),
			new Answer('искажение', 0),
			new Answer('кривая Безье', 0),
			new Answer('свободная рука', 1),
		]
	),
	new Question(
		'С помощью, какой команды можно изменить размер изображения, находящегося на каком-либо слое?',
		[
			new Answer('Размер холста', 0),
			new Answer('Размер изображения', 0),
			new Answer('Свободная трансформация ', 1),
			new Answer('Объединить слои', 0),
		]
	),
	new Question(
		'Если в окне открыто несколько файлов, переключаться между ними можно',
		[
			new Answer('Window (Ctrl-Tab) ', 1),
			new Answer('Window (Shift-Tab)', 0),
			new Answer('Window (Ctrl- Shift)', 0),
			new Answer('нет правильного ответа', 0),
		]
	),
	new Question('Какое назначение инструмента "Штамп"?', [
		new Answer('для удаления отдельных фрагментов изображения', 0),
		new Answer('для клонирования отдельных фрагментов изображения ', 1),
		new Answer('для перемещения отдельных фрагментов изображения', 0),
		new Answer('для отделения отдельных фрагментов изображения', 0),
	]),
	new Question(
		'Какой инструмент Adobe Photoshop служит для выделения областей одного цвета?',
		[
			new Answer('Штамп', 0),
			new Answer('Волшебная палочка', 1),
			new Answer('Пипетка', 0),
			new Answer('Лассо', 0),
		]
	),
	new Question(
		'Как называется инструмент, позволяющий залить изображение двумя плавно перетекающими друг в друга цветами?',
		[
			new Answer('узор', 0),
			new Answer('заливка', 0),
			new Answer('градиент', 1),
			new Answer('банка краски', 0),
		]
	),
	new Question('Какие цвета входят в цветовую модель RGB?', [
		new Answer('чёрный, синий, красный', 0),
		new Answer('жёлтый, розовый, голубой', 0),
		new Answer('розовый, голубой, белый', 0),
		new Answer('красный, зеленый, голубой ', 1),
	]),
	new Question('Режим Быстрая Маска позволяет: ', [
		new Answer('маскировать часть изображения', 0),
		new Answer('вырезать часть изображения', 0),
		new Answer('создавать новое выделение', 1),
		new Answer('редактировать существующее выделение', 0),
	]),
	new Question('Векторное изображение это -', [
		new Answer(
			'Совокупность сложных и разнообразных геометрических объектов',
			1
		),
		new Answer(
			'Совокупность сложных и разнообразных геометрических объектов, одинаковых по размеру',
			0
		),
		new Answer(
			'Массив пикселов, одинаковых по размеру и форме, расположенных в узлах регулярной сетки',
			0
		),
		new Answer('нет верного ответа', 0),
	]),
	new Question(
		'Для задания исходной точки клонирования инструментом Штамп нужно щелкнуть на ней мышкой при:',
		[
			new Answer('нажатой клавише Alt', 1),
			new Answer('нажатой клавише Shift', 0),
			new Answer('нажатой клавише Ctrl', 0),
			new Answer('полной луне', 0),
		]
	),
	new Question('Для чего в Photoshop применяются фильтры?', [
		new Answer('для улучшения яркости изображений', 0),
		new Answer('для нанесения различных художественных эффектов', 1),
		new Answer('для нанесения тени или объема', 0),
		new Answer('для улучшения контрастности изображений', 0),
	]),
	new Question('Какой инструмент позволяет сделать многоугольное выделение?', [
		new Answer('Прямоугольник', 0),
		new Answer('Магнитное лассо', 0),
		new Answer('Прямоугольное лассо', 1),
		new Answer('Волшебная палочка', 0),
	]),
	new Question('Инструмент Магнитное Лассо используется для:', [
		new Answer('выделения любых участков изображения', 0),
		new Answer('нет правильного ответа', 0),
		new Answer('перемещения каких-либо участков изображения', 0),
		new Answer('выделения контрастных участков изображения', 1),
	]),
	new Question(
		'Что происходит, когда при трансформировании области командой Редактирование-Трансформирование-Мсаштаб удерживается клавиша Shift?',
		[
			new Answer(
				'Выделенная область копируется на новый слой в новом масштабе',
				0
			),
			new Answer('Масштабируется выделение на всех видимых слоях', 0),
			new Answer('Сохраняются пропорции выделения ', 1),
			new Answer(
				'Выделение трансформируется только в горизонтальном направлении',
				0
			),
		]
	),
	new Question('Элементы рамки выделения используются для', [
		new Answer('Преобразования объектов', 1),
		new Answer('Для заливки объекта', 0),
		new Answer('для вырезки объекта', 0),
		new Answer('нет правильного ответа', 0),
	]),
	new Question('Логарифмическая спираль - это спираль у которой', [
		new Answer(
			'Расстояние между двумя смежными витками спирали, измеренное вдоль радиуса, проведенного из ее центра, равномерно увеличивается пропорционально некоторой константе',
			1
		),
		new Answer(
			'Расстояние между двумя смежными витками спирали, измеренное вдоль радиуса, проведенного из ее центра, равномерно увеличивается в несколько раз',
			0
		),
		new Answer(
			'Расстояние между двумя смежными витками спирали, измеренное вдоль радиуса, проведенного из ее центра, одинаково для всей спирали',
			0
		),
		new Answer('нет правильного ответа', 0),
	]),
	new Question('Симметричные спирали это спирали у которых ', [
		new Answer(
			'Расстояние между двумя смежными витками спирали, измеренное вдоль радиуса, проведенного из ее центра, одинаково для всей спирали',
			1
		),
		new Answer(
			'Расстояние между двумя смежными витками спирали, измеренное вдоль радиуса, проведенного из ее центра, равномерно увеличивается пропорционально некоторой константе',
			0
		),
		new Answer(
			'Расстояние между двумя смежными витками спирали, измеренное вдоль радиуса, проведенного из ее центра, равномерно увеличивается в несколько раз',
			0
		),
		new Answer('нет правильного ответа', 0),
	]),
];

// The test itself
const quiz = new Quiz(1, questions, results);

Update();

// Test update
function Update() {
	// Checking if there are questions left
	if (quiz.current < quiz.questions.length) {
		// If there are - change the heading
		headElem.innerHTML = quiz.questions[quiz.current].text;

		// Delete old answer's options
		buttonsElem.innerHTML = '';

		// Make buttons for new answer's options
		for (i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
			let btn = document.createElement('button');
			btn.className = 'button';

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute('index', i);

			buttonsElem.appendChild(btn);
		}

		// Display number of current question
		pagesElem.innerHTML = quiz.current + 1 + ' / ' + quiz.questions.length;

		// Call function that will attach events to new buttons
		Init();
	} else {
		// If that's the end - displaying the result
		buttonsElem.innerHTML = '';
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = 'Score: ' + quiz.score;
	}
}

function Init() {
	// Finding all the buttons
	let btns = document.getElementsByClassName('button');

	for (i = 0; i < btns.length; i++) {
		// Attaching the event for every single button
		// On click Click() functiong will work
		btns[i].addEventListener('click', function (e) {
			Click(e.target.getAttribute('index'));
		});
	}
}

function Click(index) {
	// Getting the right answer's number
	let correct = quiz.Click(index);

	// Finding all the buttons
	let btns = document.getElementsByClassName('button');

	// Making buttons gray
	for (i = 0; i < btns.length; i++) {
		btns[i].className = 'button button_passive';
	}

	// If that's a type 1 test, then the right answers will be green and wrong one red
	if (quiz.type == 1) {
		if (correct >= 0) {
			btns[correct].className = 'button button_correct';
		}

		if (index != correct) {
			btns[index].className = 'button button_wrong';
		}
	} else {
		// Otherwise user's choice will be green
		btns[index].className = 'button button_correct';
	}

	// Waiting a second and refreshing the test
	setTimeout(Update, 1000);
}
