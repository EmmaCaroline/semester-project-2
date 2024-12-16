import { load } from "../../api/auth/key";
import { deletePost } from "../../api/listings/delete";

export async function onDeletePost(post, author) {
  const user = load("user");
  const userName = user?.name;

  const deleteButton = document.getElementById("delete-button-container");

  if (author === userName) {
    deleteButton.innerText = "Delete Post";
    deleteButton.dataset.postId = post.id;

    deleteButton.style.display = "block";

    deleteButton.addEventListener("click", handleDelete);
  } else {
    deleteButton.style.display = "none";
  }
}

export async function handleDelete(event) {
  const postId = event.target.dataset.postId;

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
      window.location.href = "/profile/";
    } else {
      window.location.reload();
    }
  } catch (error) {
    console.error("The post could not be deleted:", error);
    alert("Failed to delete the post.");
  }
}
