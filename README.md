# NextJS Project Issue Tracker Mosh

## Setting Up the Development Environment

Install some extension on Visual Studio Code.

1. ES7+React, React template.
2. TypeScript nightly, Typescript syntax.
3. Tailwind Intelense, Show Tailwind syntax.
4. Prisma, Prisma syntax highlight.

## Creating a New Project

Create NextJS project with.

1. On terminal use `npx create-next-app@13.4.19`.
2. Then set:
    - project name: issue-tracker
    - typescript: yes
    - eslint: yes
    - tailwind: yes
    - /src :no
    - router: yes
    - aliases: no
3. And open project folder with `cd issue-tracker`.
4. Open project on Visual Studio Code `code .`.
5. On app/page.tsx clear all html, replace it with div only.
6. Also delete background color of css on app/global.css.
7. Finally commit it on source control.

## Building the NavBar

1. Firstly make new file of component on /app, name it NavBar.tsx.
2. Type rafce to initialize react component on it.
3. Import this NavBar component on /app/layout.tsx, place it on top of {childern}, then nest {children} on main tag.
4. Create nav tag with ul that have 2 li.
5. Import link from next.
6. Give some tailwind class like flex, h-, space-x-, mb, border-b, px, and items-center.
7. For icon install react icons library with `npm install react-icons --save`.
8. And import AiFillBug from react-icon/ai, use it as icon on nav.
9. On each Link tag add tailwind class, that is text-color and hover:text-color. Also add transition-color class to make it have animation.
10. To make Link tag more advance, make an array name links, make some object with label and href as property.
11. Then map links with Link tag. the href prop as key and href, and label as text on it.
12. Finally commit it.

## Styling the Active Link

1. Make new folder name issues in app/, and on it make pages.tsx file. Then initialize react component by type rafce.
2. Open NavBar.tsx. make this component as client with `"use client"` on top of it.
3. Import {usePathName } from next/navigation.
4. Make a variable name currentPath with value usePathName().
5. Then make conditional render:
    1. On class in Link tag, use string literal and tenary operation that will make text-color darker if href same with currentPath.
    2. Or with advance method. Using classnames library to make class conditional:
        1. Install classnames library with `npm i classnames@2.3.2`.
        2. Then Import classnames from ‘classnames’
        3. In Link tag, we can use classnames on class, and add object that have property as class and the value as conditional, if value true the property will add on class.
6. And finally do commit.

## Setting Up MySQL

1. Download MySQL Community Server in MySQL website.
2. And use datagrip as DBMS.

In my case i will use Laragon to run MySQL and phpMyAdmin as DBMS.

## Setting Up Prisma

1. Instal prisma with `npm i prisma@5.3.1`. Then initalize prisma with `npx prisma init`.
2. Open /prisma/schema.prisma . Change datasource db provider to “mysql”
3. And open /.env. Change url to mysql

## Creating the Issue Model

1. Open prisma/schema.prisma. type model Issue (with pascal type and singular) and add on it:
    1. id Int @id @default(autoincrement())
    2. title String @db.VarChar(255)
    3. description String @db.Text
    4. status Status @default(OPEN)
    5. createdAt DateTime @default(now())
    6. updateAt DateTime @updateAt
2. And below it make enum for status that has:
    1. OPEN
    2. ON_PROGRESS
    3. CLOSED
3. Then to format it, run code `npx prisma format`.
4. To Create and apply the migration run `npx prisma migrate dev`. name it create issue
5. Prisma will add database and table. Also create a folder migrations and file on it that have SQL code as migration.
6. Check database with phpMyAdmin
7. Commit it.

## Building an API

1. On /app create new folder and file /api/issues/route.ts.
2. Import NextRequest from next/server on top of it.
3. Then create an async function name POST that have argument name resquest that type NextRequest. And export this function.
4. On it make variable name body has value await request.json().
5. For validation instal zod with `npm i zod@3.22.2` . And Import { z } from zod.
6. Add variable above POST function name createIssueSchema (fill it with non default data on table) has value z.Object({}). On that object add:
    1. title: z.string().min(1).max(255)
    2. description: z.string.min(1)
7. Then make new variabel name validation with value createIssueSchema.safeParse(body)
8. Below it make conditional if validation.success is false then return NextResponse.json(validation.error.errors, {staus: 400}).
9. Next open google and search best practice prisma nextjs. This code:
    
    ```jsx
    import { PrismaClient } from '@prisma/client'
    
    const prismaClientSingleton = () => {
      return new PrismaClient()
    }
    
    type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>
    
    const globalForPrisma = globalThis as unknown as {
      prisma: PrismaClientSingleton | undefined
    }
    
    const prisma = globalForPrisma.prisma ?? prismaClientSingleton()
    
    export default prisma
    
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
    ```
    
    1. Copy code above and make new file on prisma/client.ts. This code ensure single instance on prisma.
    2. Then open again app/api/issues/route. And Import prisma from prisma/client.
    3. On POST function make variable newIssue has value await prisma.issue.create({}). Fill it with object name data that has object as value that have:
        1. title: body.title
        2. description: body.description
    4. Then return NextResponse.json(newIssue, {status: 201}).
    5. Finally commit it on git.

## Setting Up Radix UI

Use Radix UI to get pretty ReactJS components

1. Install Radix UI with `npm install @radix-ui/themes`.
2. Then open /app/layout.tsx.
3. Import @radix-ui/themes/styles.css on top of layout.tsx.
4. And also import  { Theme } from @radix-ui/themes.
5. Next wrap Theme tag inside body tag.
6. To use Radix UI component, open /app/issues/page.tsx.
7. And import { Button } from @radix-ui/themes. Then use Button as tag.
8. Finally commit.

## Building the New Issue Page

We can search a lot of component of Radix UI on the website radix-ui.com

1. Open /app/issues/new/page.tsx. Then type rafce to make react component.
2. Make this react component as client, by type use client on top of it.
3. Import { TextField } from @radix-ui/themes. To use this component we can check it on Radix UI website. And place it on this page.
4. Then we need make Link to open this page. Open /app/issues/page.tsx.
5. Use Link tag by import Link from next/link. Place Link Tag inside Button Tag.
6. And set Link tag href atributes value /issues/new.
7. Next open again /app/issues/new/page.tsx. Add class on div parent tag of TextField tag with value max-w-xl and space-y-3.
8. But dont forget to add padding on main element by open /app/layout.tsx. And add class p-5 on main tag.
9. Back to /app/issues/new/page.tsx. Use TextArea component from Radix UI, by import { TextArea } from @radix-ui/themes.
10. So then also add Button tag that have text Submit on button of TextArea tag.
11. Finally commit it to repository

## Building the New Issue Page

1. Search TextField component of Radix UI on radix-ui.com.
2. Next create new folder and file on /app/issues/new/page.tsx, then type rafce to get react component template.
3. Then import { TextField } from @radix-ui/themes, and use it as tag. add a div tag as parent with class max-x-xl and space-y-3 on it.
4. Next add button to get New Issue Page from Issue Page, open /app/issues/page.tsx. 
5. Add Button tag from Radix UI, and Link tag from next/link that have href value of /issues/new.
6. Also to add some padding on side of page, open /app/layout.tsx, and add class p-5 on main tag.
7. Back to /app/issues/new/page.tsx, import and add { TextArea } from @radix-ui/themes, below of TextField tag.
8. Finally add Button tag that also from Radix UI on buttom of element, and commit this change.

## Customizing Radix UI Theme

1. Open /app/layout.tsx, and see that there is Theme tag, add ThemePanel tag onit.
2. And check on browser, we will se a panel that have some option to change color, appearance, radius, scaling, and panel background.
3. We can change it as we want, then click the Copy Theme button.
4. We get a Theme opener tag with additional attributes, replace it with old Theme opener tag. And we can delete the ThemePanel tag.
5. Next part is optional, because in NextJS 14 it already use Inter font.
6. Next we need to active the Inter font from next, because when use Radix UI, it will use default font of browser.
7. Firstly, open Typography on Radix UI documentation. And search of NextJS.
8. Copy the variables prop on Inter variabel, and add it on our code.
9. Also change html tag class with inter.variable.
10. Then create file name theme-config.css, and copy code from Radix UI documentation of theme-config.css file.
11. And import it on /app/layout.tsx
12. Dont forget to check font on inspect mode, to see if the font already change.
13. Finally commit this repository.

## Adding a Markdown Editor

1. Firstly, install the required package by type `npm i --save react-simplemde-editor easymde` on terminal.
2. Now, in your React component where you want to integrate the Markdown editor, import the necessary components. Add the following lines at the top of your file
    
    ```jsx
    import SimpleMDE from 'react-simplemde-editor';
    import 'easymde/dist/easymde.min.css';
    ```
    
3. Next, locate the TextArea element that you want to replace with the Markdown editor. Replace it with the **`SimpleMDE`** component/
4. Once you've implemented the Markdown editor and are satisfied with the changes, it's time to commit your modifications

## Handling Form Submission

1. Begin by installing the required libraries `npm i react-hook-form@7.46.1 axios@1.5.0`
2. Navigate to the file **`/app/issues/new/page.tsx`** and import the necessary components and hooks:
    
    ```jsx
    import { useForm, Controller } from 'react-hook-form';
    import axios from 'axios';
    import { useRouter } from 'next/navigation';
    ```
    
3. Define an interface named **`IssueForm`** to represent the structure of your form data:
    
    ```jsx
    interface IssueForm {
    title: string;
    description: string;
    }
    ```
    
4. Within the **`newIssuePage`** component, use the **`useForm`** hook, and extract the **`register`**, **`control`**, and **`handleSubmit`** properties:
    
    ```jsx
    const { register, control, handleSubmit } = useForm<IssueForm>();
    ```
    
5. To redirect the user to the 'issues' page after successful form submission, use the **`useRouter`** hook:
    
    ```jsx
    const router = useRouter();
    ```
    
6. Replace the existing structure in the **`newIssuePage`** with a form element and include the necessary input fields:
    
    ```jsx
    <form onSubmit={handleSubmit(async (data) => {
    await axios.post('/api/issues', data);
    router.push('/issues');
    })}>
    <TextField.Root>
            <TextField.Input placeholder="Title" {...register('title')}. />
          </TextField.Root>
    <Controller
    name="description"
    control={control}
    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
    />
    <button type="submit">Submit</button>
    </form>
    ```
    
7. Try submitting data through the form and check your database to ensure that the data is stored. Once you confirm the functionality, commit your changes

## Handling Errors

1. Wrap the **`axios.post`** call in a try-catch block within the **`onSubmit`** function:

```jsx
try {
await axios.post("/api/issues", data);
router.push("/issues");
} catch (error) {
console.log(error);
}
```

1. Update the error response format in **`/app/api/issues/route.tsx`** to use **`validation.error.format()`**:

```jsx
return NextResponse.json(validation.error.format(), { status: 400 });
```

1. Customize error messages in your validation schema by appending them to the respective schema types:

```jsx
// Before
title: schema.string(),

// After
title: schema.string().min(1, "Title is required"),
```

1. Import the **`Callout`** component from **`@radix-ui`**:

```jsx
import { Callout } from '@radix-ui/react-callout';
```

1. Create a state variable to manage errors using **`useState`**:

```jsx
const [error, setError] = useState<string | null>(null);
```

1. Replace the **`console.log(error)`** in the catch block with setting the error state:

```jsx
setError('An unexpected error occurred.');
```

1. Wrap your form in a **`div`** and use the **`Callout`** component to display errors:

```jsx
<div className="max-w-xl">
<Callout.Root className="mb-5" style={{ color: 'red' }} open={!!error}>
<Callout.Text>{error}</Callout.Text>
</Callout.Root>
<form onSubmit={handleSubmit(async (data) => {
try {
await axios.post('/api/issues', data);
router.push('/issues');
} catch (error) {
setError('An unexpected error occurred.');
}
})}>
{/* Form inputs go here */}
<Button >Submit</Button>
</form>
</div>
```

## Implementing Client-Side Validation

1. Open **`app/api/issues/route.ts`** and extract the **`createIssueSchema`** into a separate file, e.g., **`validationSchemas.ts`**.
2. Move this file to the **`app`** folder.
3. Install the **`@hookform/resolvers`** with`npm i @hookform/resolvers@3.3.1`
4. Import **`zodResolver`** from **`@hookform/resolver/zod`** at the top of **`/app/issues/new.page.tsx`**:
    
    ```jsx
    import { zodResolver } from '@hookform/resolvers/zod';
    ```
    
5. Update the **`useForm`** hook to include the Zod resolver:
    
    ```jsx
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
    });
    ```
    
6. Replace the interface with a type that infers from the Zod schema:
    
    ```jsx
    type IssueForm = z.infer<typeof createIssueSchema>;
    ```
    
7. For each input field, implement conditional rendering to display validation errors:
    
    ```jsx
    // title
    {errors.title && (
    <Text as="p" style={{ color: 'red' }}>{errors.title.message}</Text>
    )}
    
    //description
    {errors.description && (
              <Text as="p" style={{ color: 'red' }}>{errors.description.message}</Text>
            )}
    ```
    
8. Finally, commit your changes.

## Extracting the ErrorMessage Component

1. Create a new folder and file: **`/app/components/ErrorMessage.tsx`**.
2. Inside **`ErrorMessage.tsx`**, initialize a React functional component with the **`rafce`** snippet.
3. Define the **`Props`** interface with a **`children`** property of type **`ReactNode`**.
4. Modify the function signature to accept **`PropsWithChildren`**.
    
    ```jsx
    // /app/components/ErrorMessage.tsx
    import { PropsWithChildren, ReactNode } from 'react';
    
    //interface Props {
    //children: ReactNode;
    //}
    
    const ErrorMessage = ({ children }: PropsWithChildren) => {
    if (!children) return null;
    
    return <Text style={{ color: 'red' }} as="p">{children}</Text>;
    };
    
    export default ErrorMessage;
    ```
    
5. Import the **`ErrorMessage`** component at the top of **`/app/issues/new.page.tsx`**:
    
    ```jsx
    import ErrorMessage from '../components/ErrorMessage';
    ```
    
6. Replace the conditional rendering with the **`ErrorMessage`** component in **`/app/issues/new.page.tsx`**:
    
    ```jsx
    <ErrorMessage>{errors.title?.message}</ErrorMessage>
    ```
    
7. Commit your changes.

## Adding a Spinner

1. Utilize the Tailwind CSS spinner by visiting the tailwind elements spinnerand copying the provided code.
2. Use the **`rafce`** snippet to initialize a React functional component.
3. Paste the copied spinner code, replacing **`class`** with **`className`**. Also change the h, w, and border class.
    
    ```tsx
    import React from "react";
    
    const Spinner = () => {
      return (
        <div
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      );
    };
    
    export default Spinner;
    ```
    
4. Import the **`Spinner`** component at the top of **`/app/issues/new.page.tsx`**:
    
    ```jsx
    import Spinner from '../components/Spinner';
    ```
    
5. Insert the **`Spinner`** component inside the **`button`** tag:
    
    ```tsx
    <Button disabled={isSubmitting}>
              Submit {isSubmitting && <Spinner />}
    </Button>
    ```
    
6. Create a new state variable to track the submission process:
    
    ```jsx
    const [isSubmitting, setSubmitting] = useState(false);
    ```
    
7. Set **`isSubmitting`** to **`true`** at the beginning of the try block and to **`false`** in the catch block:
    
    ```jsx
    try {
    setSubmitting(true);
    await axios.post('/api/issues', data);
    router.push('/issues');
    } catch (error) {
    setSubmitting(false);
    setError('An unexpected error occurred.');
    }
    ```
    
8. Test the form submission with the spinner element.
9. Commit your changes:
