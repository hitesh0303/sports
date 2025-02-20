const eventsData = [
  {
    id: 1,
    title: "PICT ELEVATE 2024",
    description: "Annual mega sports festival featuring multiple sports competitions, cultural events, and professional workshops. Join us for four days of excitement, competition, and celebration of sports excellence.",
    startDate: "2024-02-24",
    endDate: "2024-02-27",
    venue: "PICT Campus Ground",
    sports: ["Cricket", "Football", "Basketball", "Volleyball", "Athletics", "Chess", "Table Tennis", "Badminton"],
    type: "elevate",
    registrationLink: "https://elevate.pict.edu",
    brochureUrl: "/brochures/elevate2024.pdf"
  },
  {
    id: 2,
    title: "PICT Intra-College Sports Week 2024",
    description: "Annual intra-college sports competition featuring various sports events between different departments. Participate and represent your department in this exciting competition.",
    startDate: "2024-03-03",
    endDate: "2024-03-06",
    venue: "PICT Sports Complex",
    sports: ["Cricket", "Football", "Basketball", "Volleyball", "Table Tennis", "Carrom", "Chess"],
    type: "intra",
    registrationDeadline: "2024-02-28"
  },
  {
    id: 3,
    title: "PICT Annual Sports Day 2024",
    description: "A grand celebration of sports featuring track and field events, prize distribution ceremony, and special performances. Don't miss this spectacular event!",
    startDate: "2024-03-10",
    endDate: "2024-03-10",
    venue: "PICT Main Ground",
    sports: ["Athletics", "Running", "Long Jump", "High Jump", "Shot Put", "Relay Race"],
    type: "annual",
    highlights: [
      "Chief Guest: Notable Sports Personality",
      "Prize Distribution Ceremony",
      "Cultural Performances",
      "Sports Demonstrations"
    ]
  },
  {
    id: 4,
    title: "Inter-Department Cricket Tournament",
    description: "Annual cricket championship between different departments of PICT. Come support your department's team!",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    venue: "PICT Cricket Ground",
    sports: ["Cricket"],
    type: "tournament",
    registrationDeadline: "2024-03-10"
  },
  {
    id: 5,
    title: "PICT Chess Championship",
    description: "Annual chess tournament featuring both rapid and classical formats. Test your strategic skills!",
    startDate: "2024-03-25",
    endDate: "2024-03-26",
    venue: "PICT Indoor Sports Complex",
    sports: ["Chess"],
    type: "tournament",
    registrationDeadline: "2024-03-20"
  }
];

export const getUpcomingEvents = () => {
  const currentDate = new Date();
  return eventsData
    .filter(event => new Date(event.startDate) > currentDate)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
};

export const getEventTypeColor = (type) => {
  const colors = {
    elevate: 'error',
    tournament: 'primary',
    intra: 'success',
    annual: 'warning'
  };
  return colors[type] || 'default';
};

export const getEventTypeLabel = (type) => {
  const labels = {
    elevate: 'ELEVATE',
    tournament: 'Tournament',
    intra: 'Intra-College',
    annual: 'Annual Event'
  };
  return labels[type] || type;
};

export default eventsData; 