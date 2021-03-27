export function helloWorldResolver(_: any, args: { sauce: String }, context: any): String {
    console.log(args.sauce);
    console.log(context);
    return "Hello world";
}