export const INITIAL_FIELDS = [
  {
    id: "1",
    label: "First Name",
    type: "text",
    required: true,
    placeholder: "Jane",
  },
  {
    id: "2",
    label: "Last Name",
    type: "text",
    required: true,
    placeholder: "Doe",
  },
  {
    id: "3",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "jane.doe@example.com",
  },
  {
    id: "4",
    label: "Hobbies",
    type: "checkbox",
    required: false,
    options: [
      { label: "Reading", value: "reading" },
      { label: "Gaming", value: "gaming" },
      { label: "Music", value: "music" },
      { label: "Sports", value: "sports" },
    ],
  },
  {
    id: "5",
    label: "Gender",
    type: "radio",
    required: true,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
];
