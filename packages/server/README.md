## How to add a new route

Add a method to the controller with `@Get` or other http method decorator.
To get request body, path params, query params, etc, use decorators on the arguments. [Available decorators](https://docs.nestjs.com/controllers#request-object). Additionally, we have custom decorators `@User` and `@UserId` to get the currently logged in user.
