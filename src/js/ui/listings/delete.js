import { load } from "../../api/auth/key";
import { deletePost } from "../../api/listings/delete";

/**
 * Displays the delete button if the current user is the author of the post.
 * Sets up an event listener for the delete button to call the `handleDelete` function.
 *
 * @param {Object} post - The post object that contains the post's details.
 * @param {string} author - The name of the post's author.
 * @returns {void}
 */
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

/**
 * Handles the deletion of a post when the delete button is clicked.
 * Prompts the user for confirmation and proceeds to delete the post
 * by calling the `deletePost` function.
 *
 * @param {Event} event - The click event triggered by the delete button.
 * @returns {void}
 */
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
