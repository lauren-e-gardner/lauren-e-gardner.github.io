export const ContactSection = () => {
    return (
      <section className="grid gap-10 p-5 grid-cols-[auto_1fr] max-md:grid-cols-[1fr]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/61d39b3546d11c10d930ef723c44fc802a85133d"
          alt="Profile"
          className="object-cover rounded-3xl h-[360px] w-[359px] max-sm:w-full max-sm:h-auto"
        />
        <div className="flex flex-col gap-10">
          <div className="text-lg leading-relaxed">
            <strong>Email</strong>
            <p>laurenator1784@gmail.com</p>
          </div>
          <div className="text-lg leading-relaxed">
            <strong>LinkedIn</strong>
            <p>https://www.linkedin.com/in/lauren-e-gardner02/</p>
          </div>
          <div className="text-lg leading-relaxed">
            <strong>GitHub</strong>
            <p>https://github.com/lauren-e-gardner</p>
          </div>
        </div>
      </section>
    );
  };
  