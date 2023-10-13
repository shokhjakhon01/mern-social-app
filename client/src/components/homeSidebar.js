import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function HomeSideBar() {
	const [data, setData] = useState([]);
	const history = useHistory();
	const token = localStorage.getItem("token");
	useEffect(() => {
		fetch("http://localhost:8000/myPost", {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				token: token
			}
		}).then((response) => response.json()).then(data => {
			if (data.message == 'Unauthorized') {
				history.push('/login');
			}
			setData(data.data);
		});
	}, []);

	return (
		<>
			{data.map(item => (
				<div className="card" key={item._id}>
					<div className="card-image">
						<img style={{ height: 300, width: '100%' }} src={item.photo} alt="ii" />
					</div>
					<div className="card-content">
						<p className="card-title postedBy">{item.postedBy.name}</p>
						<b>{item.title}</b>
						<p>{item.body}</p>
					</div>
				</div>
			))}
		</>
	);
};