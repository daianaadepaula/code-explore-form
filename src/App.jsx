import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty("O nome é obrigatório")
    .min(3, "O nome precisa de no mínimo 3 caracteres")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("Formato de email inválido")
    .toLowerCase(),
  subject: z
    .string()
    .nonempty("O assunto é obrigatório")
    .min(5, "O assunto precisa de no mínimo 5 caracteres"),
  message: z.string().nonempty("A mensagem é obrigatório"),
});

const App = () => {
  const [output, setOutput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });

  function createUser(data) {
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <main className="h-screen bg-zinc-400 flex flex-col gap-10 items-center justify-center">
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label className="text-zinc-800 text-lg" htmlFor="name">Nome</label>
          <input
            type="text"
            className="border border-zinc-800 shadow-sm rounded h-10 bg-zinc-600 text-white px-3"
            {...register("name")}
          />
          {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-zinc-800 text-lg" htmlFor="email">Email</label>
          <input
            type="email"
            className="border border-zinc-800 shadow-sm rounded h-10 bg-zinc-600 text-white px-3"
            {...register("email")}
          />
          {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-zinc-800 text-lg" htmlFor="subject">Assunto</label>
          <input
            type="text"
            className="border border-zinc-800 shadow-sm rounded h-10 bg-zinc-600 text-white px-3"
            {...register("subject")}
          />
          {errors.subject && <span className="text-red-600 text-sm">{errors.subject.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-zinc-800 text-lg" htmlFor="message">Mensagem</label>
          <textarea
            cols="30"
            rows="10"
            className="border border-zinc-800 shadow-sm rounded px-3 bg-zinc-600 text-white"
            {...register("message")}
          ></textarea>
          {errors.message && <span className="text-red-600 text-sm">{errors.message.message}</span>}
        </div>

        <button
          type="submit"
          className="bg-purple-500 rounded font-semibold text-white h-10 hover:bg-purple-600"
        >
          Enviar
        </button>
      </form>

      <pre>{output}</pre>
    </main>
  );
};

export default App;

