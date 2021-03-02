function chkRepetition(len, str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    let repeat = true;
    let j;

    for (j = 0; j < len && j + i + len < str.length; j++) {
      repeat = repeat && str.charAt(j + i) == str.charAt(j + i + len);
    }

    if (j < len) {
      repeat = false;
    }

    if (repeat) {
      i += len - 1;
      repeat = false;
    } else {
      result += str.charAt(i);
    }
  }

  return result;
}

(function ($) {
  let total_score = 0; // складність пароля
  const samePassword = "Пароль = логiну";
  const strongPass = "Сильний";
  const goodPass = "Хороший";
  const shortPass = "Недостатньо символiв";
  const badPass = "Слабкий";

  $.fn.passStrength = function (userId = "") {
    return this.each(function () {
      const obj = $(this);

      $(obj)
        .unbind()
        .keyup(function () {
          const oScore = $("#score"); // div значення складності процентiв
          const oScorebar = $("#scorebar"); // div значення складності графiка
          const oComplexity = $("#complexity"); // div значення складності тексту

          const results = $.fn.teststrength($(this).val(), $(userId).val());

          // змінити проценти
          oScore.text(total_score + "%");
          // змінити графічно
          oScorebar.css("background-position", "-" + total_score * 4 + "px");
          // змінити текст
          oComplexity.text(results);
        });

      $.fn.teststrength = function (password, username) {
        let score = 0;

        // пароль == логiну
        if (password.toLowerCase() == username.toLowerCase()) {
          return samePassword;
        }

        // зміна довжини
        score += password.length * 4;
        score += chkRepetition(1, password).length - password.length;
        score += chkRepetition(2, password).length - password.length;
        score += chkRepetition(3, password).length - password.length;
        score += chkRepetition(4, password).length - password.length;

        // пароль < 4
        if (password.length < 4) {
          score = 0;
          total_score = score;

          $("#numLength").parent().removeClass("pass");
          $("#numLength").parent().addClass("fail");
          $("#div_numLength").removeClass("pass");
          $("#div_numLength").addClass("fail");
          $("#numLength").text(total_score);

          return shortPass;
        } else {
          $("#numLength").text(score);
          $("#numLength").parent().removeClass("fail");
          $("#numLength").parent().addClass("pass");
          $("#div_numLength").removeClass("fail");
          $("#div_numLength").addClass("pass");
        }

        // пароль містить 3 номери
        if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) {
          score += 5;
          $("#numNumber").parent().addClass("pass");
          $("#numNumber").parent().removeClass("fail");
          $("#div_numNumber").addClass("pass");
          $("#div_numNumber").removeClass("fail");
          $("#numNumber").text(+5);
        } else {
          $("#numNumber").text(0);
          $("#numNumber").parent().removeClass("pass");
          $("#numNumber").parent().addClass("fail");
          $("#div_numNumber").removeClass("pass");
          $("#div_numNumber").addClass("fail");
        }

        // пароль містить 2 знаки
        if (
          password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)
        ) {
          score += 5;
          $("#numSign").parent().addClass("pass");
          $("#numSign").parent().removeClass("fail");
          $("#div_numSign").addClass("pass");
          $("#div_numSign").removeClass("fail");
          $("#numSign").text(+5);
        } else {
          $("#numSign").text(0);
          $("#numSign").parent().removeClass("pass");
          $("#numSign").parent().addClass("fail");
          $("#div_numSign").removeClass("pass");
          $("#div_numSign").addClass("fail");
        }

        // пароль містить великі та малі літери
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
          score += 10;
          $("#numLit_type").parent().addClass("pass");
          $("#numLit_type").parent().removeClass("fail");
          $("#div_numLit_type").addClass("pass");
          $("#div_numLit_type").removeClass("fail");
          $("#numLit_type").text(+10);
        } else {
          $("#numLit_type").text(0);
          $("#numLit_type").parent().removeClass("pass");
          $("#numLit_type").parent().addClass("fail");
          $("#div_numLit_type").removeClass("pass");
          $("#div_numLit_type").addClass("fail");
        }

        // пароль містить цифри та букви
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
          score += 15;
          $("#numLit_num").parent().addClass("pass");
          $("#numLit_num").parent().removeClass("fail");
          $("#div_numLit_num").addClass("pass");
          $("#div_numLit_num").removeClass("fail");
          $("#numLit_num").text(+15);
        } else {
          $("#numLit_num").text(0);
          $("#numLit_num").parent().removeClass("pass");
          $("#numLit_num").parent().addClass("fail");
          $("#div_numLit_num").removeClass("pass");
          $("#div_numLit_num").addClass("fail");
        }

        // пароль містить цифри та знаки
        if (
          password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) &&
          password.match(/([0-9])/)
        ) {
          score += 15;
          $("#numNum_sign").parent().addClass("pass");
          $("#numNum_sign").parent().removeClass("fail");
          $("#div_numNum_sign").addClass("pass");
          $("#div_numNum_sign").removeClass("fail");
          $("#numNum_sign").text(+15);
        } else {
          $("#numNum_sign").text(0);
          $("#numNum_sign").parent().removeClass("pass");
          $("#numNum_sign").parent().addClass("fail");
          $("#div_numNum_sign").removeClass("pass");
          $("#div_numNum_sign").addClass("fail");
        }

        // пароль містить літери та знаки
        if (
          password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) &&
          password.match(/([a-zA-Z])/)
        ) {
          score += 15;
          $("#numLit_sign").parent().addClass("pass");
          $("#numLit_sign").parent().removeClass("fail");
          $("#div_numLit_sign").addClass("pass");
          $("#div_numLit_sign").removeClass("fail");
          $("#numLit_sign").text(+15);
        } else {
          $("#numLit_sign").text(0);
          $("#numLit_sign").parent().removeClass("pass");
          $("#numLit_sign").parent().addClass("fail");
          $("#div_numLit_sign").removeClass("pass");
          $("#div_numLit_sign").addClass("fail");
        }

        // Пароль міститься в логіні або навпаки
        const user = username.toLowerCase();
        const pass = password.toLowerCase();
        if (
          user != "" &&
          pass != "" &&
          (user.indexOf(pass) > -1 || pass.indexOf(user) > -1)
        ) {
          score -= 30;
          $("#numPart_user").parent().addClass("fail");
          $("#numPart_user").parent().removeClass("pass");
          $("#div_numPart_user").addClass("fail");
          $("#div_numPart_user").removeClass("pass");
          $("#numPart_user").text(-30);
        } else {
          $("#numPart_user").text(0);
          $("#numPart_user").parent().removeClass("fail");
          $("#numPart_user").parent().addClass("pass");
          $("#div_numPart_user").removeClass("fail");
          $("#div_numPart_user").addClass("pass");
        }

        // пароль містить лише букви або знаки
        if (password.match(/^\w+$/) || password.match(/^\d+$/)) {
          score -= 10;
          $("#numOnly_ln").parent().addClass("fail");
          $("#numOnly_ln").parent().removeClass("pass");
          $("#div_numOnly_ln").addClass("fail");
          $("#div_numOnly_ln").removeClass("pass");
          $("#numOnly_ln").text(-10);
        } else {
          $("#numOnly_ln").text(0);
          $("#numOnly_ln").parent().removeClass("fail");
          $("#numOnly_ln").parent().addClass("pass");
          $("#div_numOnly_ln").removeClass("fail");
          $("#div_numOnly_ln").addClass("pass");
        }

        // пароль є частиною послідовних літер клавіатури
        const tast = "1234567890qwertyuiopasdfghjklzxcvbnm";
        if (tast.indexOf(pass) > -1) {
          score -= 20;
          $("#numTast").parent().addClass("fail");
          $("#numTast").parent().removeClass("pass");
          $("#div_numTast").addClass("fail");
          $("#div_numTast").removeClass("pass");
          $("#numTast").text(-20);
        } else {
          $("#numTast").text(0);
          $("#numTast").parent().removeClass("fail");
          $("#numTast").parent().addClass("pass");
          $("#div_numTast").removeClass("fail");
          $("#div_numTast").addClass("pass");
        }

        // пароль є частиною послідовних літер зворотної клавіатури
        const invtast = "mnbvcxzlkjhgfdsapoiuytrewq0987654321";
        if (invtast.indexOf(pass) > -1) {
          score -= 20;
          $("#invTast").parent().addClass("fail");
          $("#invTast").parent().removeClass("pass");
          $("#div_invTast").addClass("fail");
          $("#div_invTast").removeClass("pass");
          $("#invTast").text(-20);
        } else {
          $("#invTast").text(0);
          $("#invTast").parent().removeClass("fail");
          $("#invTast").parent().addClass("pass");
          $("#div_invTast").removeClass("fail");
          $("#div_invTast").addClass("pass");
        }

        // пароль є частиною послідовних літер вертикальної клавіатури
        const verttast = "1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p";
        if (verttast.indexOf(pass) > -1) {
          score -= 15;
          $("#vertTast").parent().addClass("fail");
          $("#vertTast").parent().removeClass("pass");
          $("#div_vertTast").addClass("fail");
          $("#div_vertTast").removeClass("pass");
          $("#vertTast").text(-15);
        } else {
          $("#vertTast").text(0);
          $("#vertTast").parent().removeClass("fail");
          $("#vertTast").parent().addClass("pass");
          $("#div_vertTast").removeClass("fail");
          $("#div_vertTast").addClass("pass");
        }

        // пароль є частиною послідовних літер перевернутої вертикальної клавіатури
        const invverttast = "p0lo9ki8mju7nhy6bgt5vfr4cde3xsw2zaq1";
        if (invverttast.indexOf(pass) > -1) {
          score -= 15;
          $("#invvertTast").parent().addClass("fail");
          $("#invvertTast").parent().removeClass("pass");
          $("#div_invvertTast").addClass("fail");
          $("#div_invvertTast").removeClass("pass");
          $("#invvertTast").text(-15);
        } else {
          $("#invvertTast").text(0);
          $("#invvertTast").parent().removeClass("fail");
          $("#invvertTast").parent().addClass("pass");
          $("#div_invvertTast").removeClass("fail");
          $("#div_invvertTast").addClass("pass");
        }

        // пароль є частиною літер клавіатури в порядку шахів
        const sahtast =
          "1q2w3e4r5t6y7u8i9o0pqawsedrftgyhujikolpazsxdcfvgbhnjmkl";
        if (sahtast.indexOf(pass) > -1) {
          score -= 15;
          $("#sahTast").parent().addClass("fail");
          $("#sahTast").parent().removeClass("pass");
          $("#div_sahTast").addClass("fail");
          $("#div_sahTast").removeClass("pass");
          $("#sahTast").text(-15);
        } else {
          $("#sahTast").text(0);
          $("#sahTast").parent().removeClass("fail");
          $("#sahTast").parent().addClass("pass");
          $("#div_sahTast").removeClass("fail");
          $("#div_sahTast").addClass("pass");
        }

        // пароль є частиною літер клавіатури в зворотному шаховому порядку
        const invsahtast =
          "lkmjnhbgvfcdxszaplokijuhygtfrdeswaqp0o9i8u7y6t5r4e3w2q1";
        if (invsahtast.indexOf(pass) > -1) {
          score -= 15;
          $("#invsahTast").parent().addClass("fail");
          $("#invsahTast").parent().removeClass("pass");
          $("#div_invsahTast").addClass("fail");
          $("#div_invsahTast").removeClass("pass");
          $("#invsahTast").text(-15);
        } else {
          $("#invsahTast").text(0);
          $("#invsahTast").parent().removeClass("fail");
          $("#invsahTast").parent().addClass("pass");
          $("#div_invsahTast").removeClass("fail");
          $("#div_invsahTast").addClass("pass");
        }

        // перевірити 0 < оцінка < 100
        if (score < 0) {
          score = 0;
        }
        if (score > 100) {
          score = 100;
        }

        if (score < 34) {
          total_score = score;
          return badPass;
        }

        if (score < 68) {
          total_score = score;
          return goodPass;
        }

        total_score = score;
        return strongPass;
      };
    });
  };
})(jQuery);
