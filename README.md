# Nurtree 

The goal of this project was to demonstrate the advanced capabilities of the NextJS framework by applying it to a practical use-case scenario involving dynamic rendering with a substantial data set.

Nurtree brings together two creative platforms that encourage music lovers to explore and connect with their favorite songs through visually engaging and personalized experiences.
Blending together Youtube and Spotify API, Nurtree matches the top Music Videos to your chosen songs and will provide a curated music video playlist based on your personal Spotify Playlists. 

![nurtree](https://github.com/user-attachments/assets/8baa728f-1faa-4b67-97f7-076465fc868a)

"Nurture" is a verb that means to care for and support the growth, development, or improvement of someone or something. It involves fostering an environment or providing the necessary resources to help that person, idea, or object thrive.
> "It’s important to **nurture** a creative spirit, as it can lead to innovative ideas and unique solutions."

Tree (Biology): A perennial plant with an elongated trunk or stem, supporting branches and leaves. Trees typically grow tall, and many produce fruits, flowers, or seeds.
> "He climbed the tallest **tree** in the forest to get a better view of the horizon."

> [!IMPORTANT]
> App is under review by Spotify for an extension request and will take some time to get approved for public usage, please request me to add your email to the developer/private list if you currently wish to add your personal Spotify account

www.nurtree.com

# Login with Spotify
Authenticate with your Spotify account

A guest Spotify account is available to use if you wish not to share your personal email.
  > - Username: guest-user@jkn95.dev
  > - Password: !spotify1234

> [!NOTE]
> This is a free, public shared spotify account for the sole purpose of featuring Nurtree to guests until this application is approved. Be careful not to share any personal data

![image](https://github.com/user-attachments/assets/24a097af-402a-47c0-993b-1abd5a9c7a3a)

# Usage
Search for a song, artist, album, from the search bar, or select a playlist from your library. The application will generate a page based on the track details, and retrieve the top matching music video from youtube. The player acts autonomously and automatically as it should. When the video ends, an app event will trigger and send a request for a dynamic slug route to the server component (NextJS App router and navigation feature) with the next video and track details, and render the new page. This rendering is lazily loaded, only getting the video iframe and spotify embed details when its route is active.

![image](https://github.com/user-attachments/assets/920b7369-e8a3-4f14-9cda-81e4180f1c01)

Web Pages are responsive to suit every window size, mobile, tablet, desktop, etc with the help of Tailwind/CSS 4

https://github.com/user-attachments/assets/45d51eaa-bec9-45da-994a-104a261405b5

https://github.com/user-attachments/assets/906ff664-c582-4713-887b-399cf74ba00d

80% components made from scratch, with all reusable UI functionality modular and separated into their respective tsx files. Logic defined on server components, while hooks and states handled by client components

Featuring Animated loaders, Image cards, Index containers, Track tables, User libraries, Responsive videos, Embeds and Iframes, Searchable input

Authentication with NextAuth and Spotify Provider

Interfaced types for Spotify API responses

lib folder with modular fetch API

Dynamic page slugs, API routes, automated caching for commonly reused paths

Key Metadata attribution for maximum exposure as well as accommodate REQUIRED Spotify Guidelines and Developer License Agreement




