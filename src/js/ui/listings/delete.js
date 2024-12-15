import { load } from "../../api/auth/key";
import { deletePost } from "../../api/listings/delete";

export async function onDeletePost(post, author) {
  const user = load("user");
  const userName = user?.name;

  const deleteButton = document.getElementById("delete-button-container");

  console.log("Author:", author, "UserName:", userName);

  // Check if the current user is the author of the post
  if (author === userName) {
    console.log("User is the author. Showing delete button.");
    deleteButton.innerText = "Delete Post";
    deleteButton.dataset.postId = post.id;
    console.log("Delete button ID set to:", deleteButton.dataset.postId);

    deleteButton.style.display = "block";

    // Add new event listener
    deleteButton.addEventListener("click", handleDelete);
  } else {
    console.log("User is NOT the author. Hiding delete button.");
    deleteButton.style.display = "none";
  }
}

export async function handleDelete(event) {
  console.log("Event target:", event.target);
  const postId = event.target.dataset.postId;
  console.log("Post ID to delete:", postId);

  if (!postId) {
    console.error("Invalid post ID:", postId);
    alert("Invalid post ID. Could not delete the post.");
    return;
  }

  const userConfirmed = confirm("Are you sure you want to delete this post?");
  try {
    if (userConfirmed) {
      await deletePost(postId);
      alert("The post was deleted");
      window.location.href = "/profile/profile/";
    } else {
      window.location.reload();
    }
  } catch (error) {
    console.error("The post could not be deleted:", error);
    alert("Failed to delete the post.");
  }
}
