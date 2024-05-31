export default function CourseInfoSection() {
  return (
    <div className={"w-full py-32 bg-[rgba(217,255,229,34%)] relative"}>
      <div className={"max-w-[1300px] mx-auto "}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-green-400"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
            clip-rule="evenodd"
          />
        </svg>

        <div className="grid grid-cols-[1fr_1fr] gap-x-20 text-gray-600">
          <div className="">
            <h2 className="text-5xl font-bold text-blue-950 md:text-4xl">
              Ensinamos desde o zero até ao lançamento da sua loja
            </h2>
            <p className="my-8 text-gray-500">
              O curso é composto por 5 módulos, com mais de 50 aulas práticas, apresentadas por um especialista na área
              de e-commerce e marketing digital. A cada módulo, você terá acesso a um material de apoio em PDF.
              <br /> <br /> Vamos guiá-lo passo a passo com exemplos práticos para que tú possas criar sua loja em
              poucos dias.
            </p>
            <div className="divide-y space-y-4 divide-gray-100">
              <div className="mt-8 flex gap-4 md:items-center">
                <div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-1000">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 m-auto text-indigo-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div className="w-5/6">
                  <h4 className="font-semibold text-lg text-blue-950">Suporte Dsiponível</h4>
                  <p className="text-gray-500">Temos uma equipa de suporte pronta para ajudar a qualquer momento.</p>
                </div>
              </div>
              <div className="pt-4 flex gap-4 md:items-center">
                <div className="w-12 h-12 flex gap-4 rounded-full bg-teal-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 m-auto text-teal-600"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div className="w-5/6">
                  <h4 className="font-semibold text-lg text-blue-950">Aulas online</h4>
                  <p className="text-gray-500">Aulas disponíveis 24/7, você pode assistir quando e onde quiser.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/BKFBxoU9vUk?si=jNvGwj--YLRDaLNz&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;autoplay=1&amp;mute=1&amp;loop=1&amp"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className={"w-full h-full rounded-xl"}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
