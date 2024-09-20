import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Link } from 'expo-router';
import { connect } from 'react-redux';
import { clearEmployeesList, employeesFetchAsync } from '../redux/actionCreators/employees_action_creators'

const Application = ({ employees, fetching, dispatch }) => {
	// const [records, setRecords] = useState([]);

    // console.log(employees)
    
	useEffect(() =>  {
        /*dispatch(fetchingEmployees());
		async function getRecords() {
			const response = await fetch("https://employees-server-l554.onrender.com/record");

			if(!response.ok) {
				const message = `An error ocurred ${response.statusText}`;
				console.error(message);

				return;
			}

			const records = await response.json();
			// setRecords(records);
            dispatch(fetchingEmployeesSuccess(records));
		}
		getRecords();*/
        dispatch(employeesFetchAsync())
        
		return () => dispatch(clearEmployeesList());
	}, []);

	function recordList() {
        if(fetching) {
            return <ActivityIndicator  size={"large"} />
        }
		return employees.map(record => {
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

const mapStateToProps = (state) => {
    // debugger
	return {
		employees: state.employees.employees,
        fetching: state.employees.fetching
	}
}

export default connect(mapStateToProps)(Application)

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
