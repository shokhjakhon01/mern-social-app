import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";

export const UserProfile = () => {
	const { userId } = useParams();
	const [data, setData] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	const [showFollow, setShowFollow] = useState(state ? !state?.following?.includes(userId) : true);
	const token = localStorage.getItem("token");

	useEffect(() => {
		fetch("http://localhost:8000/user/" + userId, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				token: token
			}
		}).then((response) => response.json())
			.then(data => {
				setData(data);
			});
	}, []);

	const folllowUser = () => {
		fetch("http://localhost:8000/follow", {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				token: token
			},
			body: JSON.stringify({
				followId: userId
			})
		}).then((response) => response.json())
			.then(result => {
				dispatch({ type: "UPDATE", payload: { followers: result.userFollowing.followers, following: result.userFollowing.following } });
				localStorage.setItem("user", JSON.stringify(result.userFollowing));
				setData((prev) => {
					return {
						...prev,
						user: {
							...prev.user,
							followers: [...prev.user.followers, result.userFollowing._id]
						}
					};
				});
				setShowFollow(false);
			})
			.catch((err) => console.log(err));
	};

	const unFolllowUser = () => {
		fetch("http://localhost:8000/unfollow", {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				token: token
			},
			body: JSON.stringify({
				unFollowId: userId
			})
		}).then((response) => response.json())
			.then(result => {
				// console.log(result);
				dispatch({ type: "UPDATE", payload: { followers: result.userunFollowing.followers, following: result.userunFollowing.following } });
				localStorage.setItem("user", JSON.stringify(result.userunFollowing));
				setData((prev) => {
					const newFollower = prev.user.followers.filter(s => s != result.userunFollowing._id);
					return {
						...prev,
						user: {
							...prev.user,
							followers: newFollower
						}
					};
				});
				setShowFollow(true);
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			{data ? (
				<div className="profile">
					<div className="profileMain">
						<div>
							<img
								className="profile-img"
								src="https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
								alt="profile avatar"
							/>
						</div>
						<div>
							<h4 style={{ color: 'white' }}>{data?.user?.name}</h4>
							<div className="info-profile">
								<p style={{ color: 'white' }}>{data?.post ? data?.post?.length : 0} posts</p>
								<p style={{ color: 'white' }}>{data?.user?.followers?.length} followers</p>
								<p style={{ color: 'white' }}>{data?.user?.following?.length} folllowing</p>
							</div>
							<div>
								{showFollow && <button onClick={() => folllowUser()}>Follow</button>}
								{!showFollow && <button onClick={() => unFolllowUser()}>unFollow</button>}
							</div>
						</div>
					</div>
					<div className="gallery">
						{data?.post?.map(item => (
							<div key={item._id} className="image-item">
								<img
									src={item.photo}
									alt={item._id}
								/>
							</div>
						))}
					</div>
				</div>
			) : <div>Loading</div>}
		</>

	);
};
