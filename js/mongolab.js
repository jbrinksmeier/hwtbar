/**
 * Created with JetBrains PhpStorm.
 * User: jojo
 * Date: 12/7/12
 * Time: 1:29 AM
 * To change this template use File | Settings | File Templates.
 */
angular.module('mongolab', ['ngResource']).
    factory('Question', function($resource) {
        var Question = $resource('https://api.mongolab.com/api/1/databases/hwtbar/collections/questions/:id',
            { apiKey: '4f847ad3e4b08a2eed5f3b54' }, {
                update: { method: 'PUT' }
            }
        );

        Question.prototype.test = function () {
            alert('test');
        }
    });
