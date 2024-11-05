document.addEventListener("DOMContentLoaded", () => {
  const categoriesContainer = document.getElementById("categories");

  // Example mock data to visualize the structure
  const categories = [
      {
          name: "Movies",
          subjects: [
              { name: "Inception", votes: 0 },
              { name: "Interstellar", votes: 0 }
          ]
      },
      {
          name: "Sports Teams",
          subjects: [
              { name: "LA Lakers", votes: 0 },
              { name: "New York Yankees", votes: 0 }
          ]
      }
  ];

  // Function to render the categories and subjects
  function renderCategories() {
      categoriesContainer.innerHTML = "";
      categories.forEach(category => {
          const categoryDiv = document.createElement("div");
          categoryDiv.classList.add("category");
          categoryDiv.innerHTML = `<h2>${category.name}</h2>`;

          category.subjects
              .sort((a, b) => b.votes - a.votes)
              .forEach(subject => {
                  const subjectDiv = document.createElement("div");
                  subjectDiv.classList.add("subject");
                  subjectDiv.innerHTML = `
                      <span>${subject.name}</span>
                      <span class="vote" onclick="vote('${category.name}', '${subject.name}')">
                          &#9650; <span class="vote-count">${subject.votes}</span>
                      </span>
                  `;
                  categoryDiv.appendChild(subjectDiv);
              });

          categoriesContainer.appendChild(categoryDiv);
      });
  }

  // Function to handle voting (for now, updates votes in mock data)
  window.vote = (categoryName, subjectName) => {
      const category = categories.find(c => c.name === categoryName);
      const subject = category.subjects.find(s => s.name === subjectName);
      subject.votes += 1;
      renderCategories();
  };

  // Initial render
  renderCategories();
});
