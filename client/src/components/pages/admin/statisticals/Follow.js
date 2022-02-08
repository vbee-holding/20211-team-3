import React from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";

export default function Follow() {
	const [ channelName, setChannelName ] = useState([]);
	const [ follow, setFollow ] = useState(0);

	useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("/statisticals/channels");
        const { data } = res.data;

        // setChannels(data);

        const channelName = [];
        const follow = [];

        const getData = property => object => {
        	if (property === "username") {
        		channelName.push(object[property]);
        	} else {
        		follow.push(object[property]);
        	}
        };

        const getChannelName = getData("username");
        const getFollow = getData("follow");

        data.forEach(getChannelName);
        data.forEach(getFollow);

        setChannelName(channelName);
        setFollow(follow);
      };

      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

	const data = {
		labels: channelName,
		datasets: [{
			data: follow,
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)',
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
			],
		}]
	};

	return (
		<div>
			<Pie
				data={data}
				height="500px"
				width="500px"
			/>
		</div>
	)
}