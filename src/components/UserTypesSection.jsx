

const UserTypesSection = () => {
  const userTypes = [
    {
      title: 'Developers',
      description: 'Stay organized with project tasks, collaborate with team members, and track project progress.',
    },
    {
      title: 'Corporate Professionals',
      description: 'Efficiently manage daily tasks, set priorities, and improve team coordination for better productivity.',
    },
    {
      title: 'Bankers',
      description: 'Organize financial tasks, monitor deadlines, and enhance collaboration for seamless workflow.',
    },
    // Add more user types as needed
  ];

  return (
    <section className="bg-gray-100 p-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Who Can Benefit?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userTypes.map((userType, index) => (
            <div key={index} className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">{userType.title}</h3>
              <p className="text-gray-700">{userType.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypesSection;
