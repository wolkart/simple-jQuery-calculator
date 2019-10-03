$(document).ready(function() {
	var totalMonth, 
		totalDay, 
		accumul, 
		spend, 
		moneyBox;

	$("input").keyup(function() {
		var incomeSalary = +$("#income-salary").val(), // "+" в начале, меняет тип данных в .val из string на number
			incomeFreelance = +$("#income-freelance").val(),
			incomeExtra = +$("#income-extra").val(),
			incomeExtra2 = +$("#income-extra-2").val();

		var incomeMonth = incomeSalary + incomeFreelance + incomeExtra + incomeExtra2;

		var expensesRent = +$("#expenses-rent").val(),
			expensesCredit = +$("#expenses-credit").val(),
			expensesFood = +$("#expenses-food").val(),
			expensesRelax = +$("#expenses-relax").val();

		var expensesMonth = expensesRent + expensesCredit + expensesFood + expensesRelax;

		$("#total-month").val(incomeMonth - expensesMonth);
		totalMonth = $("#total-month").val();
		calculation();
	});

	function calculation() {
		// Вычисляем накопления
		$("#accumulation").val((totalMonth - (totalMonth - (moneyBox * totalMonth) / 100)).toFixed(2)); // Вычисляем значение в процентах от месячных доходов и отнимаем это значение от суммы месячных доходов
		accumul = $("#accumulation").val();

		// Вычисляем остаток на затраты
		$('#spend').val(totalMonth - accumul);
		spend = $('#spend').val();

		// Вычисляем доступную сумму в день
		$('#total-day').val((spend / 30).toFixed(2)); // С помощью .toFixed указываем сколько знаков ставить после запятой если получается не целое число 
		totalDay = $('#total-day').val();

		// Вычисляем накопления за год
		$('#accumul-year').val(accumul * 12);
	}

	$("#slider-range").slider({
		range: "min",
		value: 0,
		min: 0,
		max: 100,
		slide: function(event, ui) {
			$("#precent").val(ui.value + "%");
			moneyBox = +$("#precent").val().replace("%", ""); // С помощью .replace меняем % на пустоту
			calculation();
		},
	});
	$("#precent").val($("#slider-range").slider("value") + "%");
});
