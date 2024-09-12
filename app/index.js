import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Link } from 'expo-router';

export default function App() {
	const [records, setRecords] = useState([]);

	useEffect(() =>  {
		async function getRecords() {
			const response = await fetch("https://employees-server-l554.onrender.com/record");

			if(!response.ok) {
				const message = `An error ocurred ${response.statusText}`;
				console.error(message);

				return;
			}

			const records = await response.json();
			setRecords(records);
		}
		getRecords();
		return;
	}, [records.length]);

	function recordList() {
		return records.map(record => {
			return (
				<DataTable.Row
					key={record._id}
				>
					<DataTable.Cell>{record.name}</DataTable.Cell>
					<DataTable.Cell>{record.position}</DataTable.Cell>
					<DataTable.Cell>{record.level}</DataTable.Cell>
					<DataTable.Cell>
						<Link 
							href={{
								pathname: "/record",
								params: record
							}}
						>Edit</Link>
					</DataTable.Cell>
				</DataTable.Row>
			)
		});
	}

  return (
    <ScrollView>
      <View style={styles.container}>
				<Pressable style={{flexDirection: 'row-reverse'}}>
					<Text style={styles.buttonText}><Link href="/record">Create Employee Record</Link></Text>
				</Pressable>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Position</DataTable.Title>
            <DataTable.Title>Level</DataTable.Title>
            <DataTable.Title></DataTable.Title>
          </DataTable.Header>
					{recordList()}
        </DataTable>  
      </View>
      <StatusBar style="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 10
  },
	buttonText: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 10,
		borderColor: 'lightgreen'
	}
});
