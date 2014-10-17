var usedQuestions = [];
/**
 * Created with JetBrains PhpStorm.
 * User: jojo
 * Date: 12/7/12
 * Time: 12:56 AM
 * To change this template use File | Settings | File Templates.
 */

var game = {
    current: 1,
    next: 2,
    questions: [],
    nextQuestion: function () {
        if (this.current < 4) {
            var questions13 = $.grep(questions, function (q, i) {
                return q.category == 1 && $.inArray(q, usedQuestions) == -1;
            });
            var index = Math.floor(Math.random()*questions13.length);
            return questions13[index];
        }
        if (this.current < 7) {
            var questions46 = $.grep(questions, function (q, i) {
                return q.category == 2 && $.inArray(q, usedQuestions) == -1;
            });
            var index = Math.floor(Math.random()*questions46.length);
            return questions46[index];
        }
        if (this.current <= 14) {
            var questions79 = $.grep(questions, function (q, i) {
                return q.category == 3 && $.inArray(q, usedQuestions) == -1;
            });
            var index = Math.floor(Math.random()*questions79.length);
            return questions79[index];
        }
        if (this.current > 14) {
            var questions10 = $.grep(questions, function (q, i) {
                return q.category == 4 && $.inArray(q, usedQuestions) == -1;
            });
            var index = Math.floor(Math.random()*questions10.length);
            return questions10[index];
        }
    },
    jokers: {
        fifty: "",
        crowd: "",
        booze: "",
        horst: ""
    },
    reset: function () {
        this.current = 1;
        this.next = 2;
        this.questions = [];
        this.jokers = {
            fifty: "",
            crowd: "",
            booze: "",
            horst: ""
        };
    }
};


angular.module('hwtbar', []).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller: startCtrl, templateUrl:'start.html'})
            .when('/start', {controller: startCtrl, templateUrl: 'game.html'})
            .when('/game/next/:questionNr', {controller: gameCtrl, templateUrl: 'game.html'})
});
function startCtrl($scope, $location) {
    game.reset();
    $scope.question = game.nextQuestion();
    game.questions.push($scope.question);
    $scope.game = game;

    $scope.mark = function (id) {
        $('li').removeClass('selected');
        $('li.'+id).addClass('selected');
    };
    $scope.next = function () {
        var answerId = $('li.selected').removeClass('selected').attr('class');
        if (answerId == $scope.question.answer) {
            $location.path('/game/next/' + game.next);
        } else {
            alert('So sorry!');
        }
    };




    $scope.fiftyfifty = function () {
        while ($('li').length > 2) {

            var wrongs = $.grep($scope.question.choices, function (c,i) {
                return c.id != $scope.question.answer;
            });
            var wrongIndex = Math.floor(Math.random()*wrongs.length);
            $('li.'+wrongs[wrongIndex].id).remove();
        }
        $('button.fifty').attr('disabled', 'disabled');
        game.jokers.fifty = "disabled";
    };

    $scope.crowd = function () {
        $('button.crowd').attr('disabled', 'disabled');
        game.jokers.crowd = "disabled";
    };
    $scope.boozeIt = function () {
        $('button.booze').attr('disabled', 'disabled');
        game.jokers.booze = "disabled";
        $location.path('/game/next/' + game.next);
    };
    $scope.horst = function () {
        $("#popup").dialog({
            width: 900,
            height: 600,
            buttons:{
                Boooza: function () {
                    game.jokers.fifty = "";
                    game.jokers.horst = "disabled";
                    $("#popup").dialog("close");
                },
                "Schwach!": function () {
                    game.jokers.horst = "disabled";
                    $("#popup").dialog("close");
                }
            }
        })
    };
}

function gameCtrl($scope, $routeParams, $location) {

    var questionNr = $routeParams.questionNr | 1;
    game.current = questionNr;
    game.next++;
    $.each(game.questions, function (index, q) {
        usedQuestions.push(q);
    });
    $scope.question = game.nextQuestion();
    game.questions.push($scope.question);
    $scope.game = game;
    $scope.mark = function (id) {
        $('li').removeClass('selected');
        $('li.'+id).addClass('selected');
    };
    $scope.next = function () {
        var answerId = $('li.selected').removeClass('selected').attr('class');
        if (game.current == 15) {
            alert('Nimm hin den Mantel der Revolution!');
            $location.path('/game/next/' + game.next);
        }
        if (answerId == $scope.question.answer) {
            $location.path('/game/next/' + game.next);
        } else {
            alert('So sorry!');
            $location.path('/game/next/' + game.next);
        }
    };
    $scope.fiftyfifty = function () {
        while ($('li').length > 2) {

            var wrongs = $.grep($scope.question.choices, function (c,i) {
                return c.id != $scope.question.answer;
            });
            var wrongIndex = Math.floor(Math.random()*wrongs.length);
            $('li.'+wrongs[wrongIndex].id).remove();
        }
        $('button.fifty').attr('disabled', 'disabled');
        game.jokers.fifty = "disabled";
    };

    $scope.crowd = function () {
        $('button.crowd').attr('disabled', 'disabled');
        game.jokers.crowd = "disabled";
    };
    $scope.boozeIt = function () {
        $('button.booze').attr('disabled', 'disabled');
        game.jokers.booze = "disabled";
        $location.path('/game/next/' + game.next);

    };
    $scope.horst = function () {
        $("#popup").dialog({
            width: 900,
            height: 600,
            buttons:{
                Boooza: function () {
                    game.jokers.fifty = "";
                    game.jokers.horst = "disabled";
                    $("#popup").dialog("close");
                },
                "Schwach!": function () {
                    game.jokers.horst = "disabled";
                    $("#popup").dialog("close");
                }
            }
        })
    };

}
