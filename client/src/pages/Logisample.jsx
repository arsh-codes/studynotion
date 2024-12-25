const Login = () => {
  // Initial state for form data
  const initialFormData = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    country: "",
    streetAddress: "",
    city: "",
    stateProvince: "",
    zipPostalCode: "",
    notificationPreference: "",
    emailPreference: {
      comments: false,
      candidates: false,
      offers: false,
    },
  };


  return (
    <div className="bg-gray-800 text-gray-700 text-gray-200 flex flex-col p-6 shadow-md">
      <h2 className="text-gray-700 m-8 text-2xl font-semibold text-white">
        Profile
      </h2>

      <div className="text-gray-700 flex justify-around dark:text-white">
        <form >
          {/* RADIO BUTTONS */}
          <section className="my-6 flex flex-col items-start">
            <h3 className="mb-1 font-semibold">Push Notifications</h3>
            <p>These are delivered via SMS to your mobile phone.</p>
            <div className="flex gap-2">
              <input
                type="radio"
                name="notificationPreference"
                id="radio1"
                value="everything"
                onChange={} />
              <label htmlFor="radio1">Everything</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="notificationPreference"
                id="radio2"
                value="sameAsEmail"
                
              />
              <label htmlFor="radio2">Same as Email</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="notificationPreference"
                id="radio3"
                value="noPushNotifications"
                onChange={handleChange}
              />
              <label htmlFor="radio3">No Push Notifications</label>
            </div>
          </section>

          {/* CHECKBOXES */}
          <section className="mt-4 flex flex-col">
            <h3 className="font-semibold">Get Emails</h3>
            <div className="mt-2 flex flex-col items-start">
              {["comments", "candidates", "offers"].map((option) => (
                <div className="flex items-start gap-2" key={option}>
                  <input
                    className="relative top-2"
                    type="checkbox"
                    name="emailPreference"
                    id={`checkbox-${option}`}
                    value={option}
                    onChange={handleChange}
                    checked={formData.emailPreference[option]}
                  />
                  <div className="flex-col items-start">
                    <label htmlFor={`checkbox-${option}`}>{option}</label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BUTTONS */}
          <div>
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-600 my-4 mr-2 rounded-md px-8 py-2.5 text-white"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={reset}
              className="bg-gray-700 hover:bg-gray-600 my-4 rounded-md px-8 py-2.5 text-white"
            >
              Reset
            </button>
          </div>
        </form>

        {/* OUTPUT */}
        <div className="text-gray-700 w-2/6 overflow-hidden dark:text-white">
          <p className="m-8 text-xl font-semibold">Object with data</p>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Login;
